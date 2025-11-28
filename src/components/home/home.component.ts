import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { DecorationService } from '../../services/decoration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private decorationService = inject(DecorationService);

  inputText = signal('');
  decorations = computed(() => {
    const text = this.inputText();
    if (!text) return [];
    return this.decorationService.decorate(text);
  });

  copiedIndex = signal<number | null>(null);

  updateInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputText.set(target.value);
  }

  copyToClipboard(text: string, index: number) {
    navigator.clipboard.writeText(text).then(() => {
      this.copiedIndex.set(index);
      setTimeout(() => this.copiedIndex.set(null), 2000);
    });
  }
}