import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export default class NavComponent  {

  constructor() {}

}
