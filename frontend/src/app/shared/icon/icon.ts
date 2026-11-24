import { Component, input } from '@angular/core';

export type IconName =
  | 'search' | 'map-pin' | 'star' | 'menu' | 'close' | 'eye' | 'eye-off' | 'check' | 'check-circle'
  | 'shield-check' | 'message' | 'arrow-right' | 'chevron-down' | 'user' | 'users' | 'grid' | 'tag'
  | 'file-text' | 'log-out' | 'home' | 'clock' | 'fence' | 'leaf' | 'sprout' | 'tractor' | 'droplet'
  | 'wrench' | 'apps' | 'alert-circle' | 'inbox' | 'briefcase' | 'plus' | 'edit' | 'external';

/**
 * Ícones em SVG inline (traço de 1,8px, grade 24x24), sem biblioteca externa.
 * São decorativos (aria-hidden): o texto ao lado ou um aria-label no botão dizem o que é.
 */
@Component({
  selector: 'app-icon',
  template: `
    <svg
      class="icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
      [attr.width]="size()"
      [attr.height]="size()"
    >
      @switch (name()) {
        @case ('search') { <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /> }
        @case ('map-pin') { <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /> }
        @case ('star') { <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" /> }
        @case ('menu') { <path d="M4 6h16M4 12h16M4 18h16" /> }
        @case ('close') { <path d="M6 6l12 12M18 6 6 18" /> }
        @case ('eye') { <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /> }
        @case ('eye-off') { <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /><path d="M3 3l18 18" /> }
        @case ('check') { <path d="m5 12.5 4.5 4.5L19 7.5" /> }
        @case ('check-circle') { <circle cx="12" cy="12" r="9" /><path d="m8 12.5 3 3 5-6" /> }
        @case ('shield-check') { <path d="M12 3 5 6v5.5c0 4.3 2.9 7.8 7 9.5 4.1-1.7 7-5.2 7-9.5V6z" /><path d="m9 12 2.2 2.2L15 10.5" /> }
        @case ('message') { <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" /> }
        @case ('arrow-right') { <path d="M5 12h14M13 6l6 6-6 6" /> }
        @case ('chevron-down') { <path d="m6 9 6 6 6-6" /> }
        @case ('user') { <circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /> }
        @case ('users') { <circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" /><path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.2.7 3.5 2.6 3.5 5.7" /> }
        @case ('grid') { <rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /> }
        @case ('tag') { <path d="M3 3h8.5l9.5 9.5-8.5 8.5L3 11.5z" /><circle cx="7.5" cy="7.5" r="1.3" /> }
        @case ('file-text') { <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /> }
        @case ('log-out') { <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /> }
        @case ('home') { <path d="M3 11.5 12 4l9 7.5M5.5 10v10h13V10" /> }
        @case ('clock') { <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /> }
        @case ('fence') { <path d="M4 20V8l2-2.5L8 8v12M16 20V8l2-2.5L20 8v12M2 12h20M2 17h20" /> }
        @case ('leaf') { <path d="M5 19c0-8 5-14 15-14 0 9-5 15-13 15-.7 0-1.4-.1-2-.3z" /><path d="M5 19c3-5 6-8 10-10" /> }
        @case ('sprout') { <path d="M12 21v-9" /><path d="M12 12c0-4-3-6-7-6 0 4 3 6 7 6zM12 14c0-3 2.5-5 6-5 0 3-2.5 5-6 5z" /> }
        @case ('tractor') { <circle cx="7" cy="17" r="3.5" /><circle cx="18" cy="18" r="2.5" /><path d="M3.5 17V8h5l2 4.5H17l1.5 3.5M8.5 8V4.5h-3" /> }
        @case ('droplet') { <path d="M12 3s6.5 6.8 6.5 11.2a6.5 6.5 0 0 1-13 0C5.5 9.8 12 3 12 3z" /> }
        @case ('wrench') { <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /> }
        @case ('apps') { <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" /><path d="M16.75 13.5v6.5M13.5 16.75H20" /> }
        @case ('alert-circle') { <circle cx="12" cy="12" r="9" /><path d="M12 7.5v5M12 16.5h.01" /> }
        @case ('inbox') { <path d="M3 13h5l1.5 3h5L16 13h5M5 5h14l2 8v6H3v-6z" /> }
        @case ('briefcase') { <rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" /> }
        @case ('plus') { <path d="M12 5v14M5 12h14" /> }
        @case ('edit') { <path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /> }
        @case ('external') { <path d="M14 4h6v6M20 4 10 14M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /> }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      line-height: 0;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
  readonly size = input(20);
}
