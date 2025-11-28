import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecorationService, Decoration } from '../../services/decoration.service';
import { DataService } from '../../services/data.service';
import { SeoService } from '../../services/seo.service';
import { ImageGeneratorService } from '../../services/image-generator.service';

@Component({
  selector: 'app-name-detail',
  templateUrl: './name-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class NameDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private decorationService = inject(DecorationService);
  private dataService = inject(DataService);
  private seoService = inject(SeoService);
  private imageGeneratorService = inject(ImageGeneratorService);

  name = signal('');
  lang = signal<'ar' | 'en'>('ar');
  imageUrl = signal('');

  decorations = computed<Decoration[]>(() => {
    const currentName = this.name();
    if (!currentName) return [];
    return this.decorationService.decorate(currentName);
  });
  
  relatedNames = signal<string[]>([]);
  copiedIndex = signal<number | null>(null);
  linkCopied = signal(false);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const nameParam = params.get('name') || '';
      const langParam = params.get('lang') as 'ar' | 'en' || 'ar';
      
      this.name.set(nameParam);
      this.lang.set(langParam);

      const generatedImgUrl = this.imageGeneratorService.generateImage(nameParam);
      this.imageUrl.set(generatedImgUrl);

      let title = '';
      let description = '';

      if (langParam === 'en') {
        title = `Decorate name ${nameParam} | Styles and decorated texts for ${nameParam}`;
        description = `Get the most beautiful decorations and texts for the name ${nameParam} in English. Copy your favorite decoration easily.`;
      } else {
        title = `زخرفة اسم ${nameParam} | أشكال ونصوص مزخرفة لاسم ${nameParam}`;
        description = `احصل على أجمل الزخارف والنصوص لاسم ${nameParam} باللغة العربية والإنجليزية. انسخ الزخرفة التي تعجبك بسهولة.`;
      }

      this.seoService.updateMeta(title, description, generatedImgUrl);
      this.relatedNames.set(this.dataService.getRelatedNames(nameParam, langParam));
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
      ? encodeURIComponent(`شاهد زخرفة اسم "${this.name()}" على موقع زخرفة:`)
      : encodeURIComponent(`Check out the decoration for the name "${this.name()}" on Zakhrafa:`);
    
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
