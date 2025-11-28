import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';


@Component({
  selector: 'app-words-list',
  templateUrl: './words-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class WordsListComponent implements OnInit {
  private dataService = inject(DataService);
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  lang = signal<'ar' | 'en'>('ar');
  searchTerm = signal('');
  private allWords = signal<string[]>([]);

  filteredWords = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const words = this.allWords();
    if (!term) {
      return words;
    }
    return words.filter(word => word.toLowerCase().includes(term));
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const langParam = params.get('lang') as 'ar' | 'en';
      this.lang.set(langParam || 'ar');
      
      if (this.lang() === 'en') {
        this.allWords.set(this.dataService.getEnglishWords());
        this.seoService.updateMeta(
          'Decorated English Words',
          'Discover decorations for the most popular English words used online.'
        );
      } else {
        this.allWords.set(this.dataService.getArabicWords());
        this.seoService.updateMeta(
          'قائمة الكلمات العربية المزخرفة',
          'اكتشف زخارف لأشهر الكلمات العربية المستخدمة على الإنترنت ووسائل التواصل الاجتماعي.'
        );
      }
    });
  }

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}