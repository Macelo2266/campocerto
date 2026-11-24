import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Icon } from '../../shared/icon/icon';

@Component({
  selector: 'app-not-found-page',
  imports: [RouterLink, Icon],
  templateUrl: './not-found-page.html',
})
export class NotFoundPage {}
