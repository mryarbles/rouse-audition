import { Routes } from '@angular/router';
import HomePageComponent, { title, path } from '@/views/home-page/home-page.component';

export const routes: Routes = [
  {
    path,
    component: HomePageComponent,
    title
  }
];
