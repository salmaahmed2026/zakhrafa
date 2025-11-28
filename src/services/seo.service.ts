import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);
  private jsonLdScriptId = 'json-ld-script';

  private setJsonLd(data: object | null) {
    let script = this.document.getElementById(this.jsonLdScriptId);
    
    if (data === null) {
      if (script) {
        this.document.head.removeChild(script);
      }
      return;
    }

    if (!script) {
      script = this.document.createElement('script');
      script.id = this.jsonLdScriptId;
      script.type = 'application/ld+json';
      this.document.head.appendChild(script);
    }
    
    script.textContent = JSON.stringify(data, null, 2);
  }

  updateMeta(title: string, description: string, imageUrl?: string) {
    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });

    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });

    if (imageUrl) {
      this.metaService.updateTag({ property: 'og:image', content: imageUrl });
      this.metaService.updateTag({ property: 'og:image:width', content: '600' });
      this.metaService.updateTag({ property: 'og:image:height', content: '315' });
      this.metaService.updateTag({ name: 'twitter:image', content: imageUrl });
      this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
      
      const jsonData = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        'name': title,
        'description': description,
        'image': imageUrl,
        'author': {
          '@type': 'Organization',
          'name': 'أداة زخرفة'
        },
        'url': this.document.location.href
      };
      this.setJsonLd(jsonData);

    } else {
      this.metaService.removeTag("property='og:image'");
      this.metaService.removeTag("property='og:image:width'");
      this.metaService.removeTag("property='og:image:height'");
      this.metaService.removeTag("name='twitter:image'");
      this.metaService.updateTag({ name: 'twitter:card', content: 'summary' });
      this.setJsonLd(null);
    }
  }
}
