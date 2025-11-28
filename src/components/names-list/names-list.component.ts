import { Component, ChangeDetectionStrategy, inject, signal, computed, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-names-list',
  templateUrl: './names-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink]
})
export class NamesListComponent implements OnInit {
  private dataService = inject(DataService);
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);

  lang = signal<'ar' | 'en'>('ar');
  searchTerm = signal('');
  private allNames = signal<string[]>([]);

  filteredNames = computed(() => {
    const term = this.searchTerm().toLowerCase();
    const names = this.allNames();
    if (!term) {
      return names;
    }
    return names.filter(name => name.toLowerCase().includes(term));
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const langParam = params.get('lang') as 'ar' | 'en';
      this.lang.set(langParam || 'ar');
      
      if (this.lang() === 'en') {
        this.allNames.set(this.dataService.getEnglishNames());
        this.seoService.updateMeta(
          'Decorated English Names',
          'Browse a list of popular English names and get decorations for them.'
        );
      } else {
        this.allNames.set(this.dataService.getArabicNames());
        this.seoService.updateMeta(
          'قائمة الأسماء العربية المزخرفة',
          'تصفح قائمة الأسماء العربية الأكثر شيوعاً واحصل على زخارفها بضغطة واحدة.'
        );
      }
    });
  }

  onSearch(event: Event) {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }
}