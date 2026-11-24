import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AuthService } from '../../core/auth/auth.service';
import { Avatar } from '../../shared/avatar/avatar';
import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-admin-shell',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Icon, Avatar],
  templateUrl: './admin-shell.html',
})
export class AdminShell {
  protected readonly auth = inject(AuthService);
}
