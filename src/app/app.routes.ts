import { Routes } from '@angular/router';
import HomePageComponent, { title, path } from '@/views/home-page/home-page.component';
import SimplePageComponent, { title as simpleTitle, path as simplePath } from '@/views/simple-page/simple-page.component';

export const routes: Routes = [
  {
    path,
    component: HomePageComponent,
    title
  },
  {
    path: simplePath,
    component: SimplePageComponent,
    title: simpleTitle
  }
];
