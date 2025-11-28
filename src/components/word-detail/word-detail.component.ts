import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecorationService, Decoration } from '../../services/decoration.service';
import { DataService } from '../../services/data.service';
import { SeoService } from '../../services/seo.service';
import { ImageGeneratorService } from '../../services/image-generator.service';

@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class WordDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private decorationService = inject(DecorationService);
  private dataService = inject(DataService);
  private seoService = inject(SeoService);
  private imageGeneratorService = inject(ImageGeneratorService);

  word = signal('');
  lang = signal<'ar' | 'en'>('ar');
  imageUrl = signal('');

  decorations = computed<Decoration[]>(() => {
    const currentWord = this.word();
    if (!currentWord) return [];
    return this.decorationService.decorate(currentWord);
  });
  
  relatedWords = signal<string[]>([]);
  copiedIndex = signal<number | null>(null);
  linkCopied = signal(false);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const wordParam = params.get('word') || '';
      const langParam = params.get('lang') as 'ar' | 'en' || 'ar';
      
      this.word.set(wordParam);
      this.lang.set(langParam);
      
      const generatedImgUrl = this.imageGeneratorService.generateImage(wordParam);
      this.imageUrl.set(generatedImgUrl);

      let title = '';
      let description = '';
      
      if(langParam === 'en') {
          title = `Decorate word "${wordParam}" | Decorated texts for "${wordParam}"`;
          description = `Get awesome decorations for the word "${wordParam}" in English and Arabic. Copy your favorite style with one click.`;
      } else {
          title = `زخرفة كلمة ${wordParam} | نصوص مزخرفة لكلمة ${wordParam}`;
          description = `احصل على أجمل الزخارف والنصوص لكلمة ${wordParam} باللغة العربية والإنجليزية. انسخ الزخرفة التي تعجبك بسهولة.`;
      }

      this.seoService.updateMeta(title, description, generatedImgUrl);
      this.relatedWords.set(this.dataService.getRelatedWords(wordParam, langParam));
    });
  }

  copyToClipboard(text: string, index: number) {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedIndex.set(index);
      setTimeout(() => this.copiedIndex.set(null), 2000);
    });
  }

  share(platform: string) {
    const url = encodeURIComponent(window.location.href);
    const text = this.lang() === 'ar' 
      ? encodeURIComponent(`شاهد زخرفة كلمة "${this.word()}" على موقع زخرفة:`)
      : encodeURIComponent(`Check out the decoration for the word "${this.word()}" on Zakhrafa:`);
    
    let shareUrl = '';

    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href).then(() => {
          this.linkCopied.set(true);
          setTimeout(() => this.linkCopied.set(false), 2000);
        });
        return;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  }
}
