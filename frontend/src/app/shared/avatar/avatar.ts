import { Component, computed, input } from '@angular/core';

/**
 * Avatar com as iniciais do nome. A API não guarda foto, então a cor é escolhida a partir do
 * nome: a mesma pessoa tem sempre a mesma cor, e nada é inventado.
 */
@Component({
  selector: 'app-avatar',
  template: `<span class="avatar" [class]="sizeClass()" [attr.data-tone]="tone()" aria-hidden="true">{{ initials() }}</span>`,
  styles: `
    :host {
      display: inline-flex;
    }
  `,
})
export class Avatar {
  readonly name = input.required<string>();
  readonly size = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  protected readonly initials = computed(() => {
    const words = this.name().trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      return '?';
    }
    const first = words[0].charAt(0);
    const last = words.length > 1 ? words[words.length - 1].charAt(0) : '';
    return (first + last).toUpperCase();
  });

  protected readonly tone = computed(() => {
    let hash = 0;
    for (const char of this.name()) {
      hash = (hash * 31 + char.charCodeAt(0)) % 5;
    }
    return hash;
  });

  protected readonly sizeClass = computed(() => {
    const size = this.size();
    return size === 'md' ? 'avatar' : `avatar avatar-${size}`;
  });
}
