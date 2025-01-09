import { Routes } from '@angular/router';
import { IframePageComponent } from './pages/iframe-page/iframe-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

export const routes: Routes = [
  { path: 'iframepage', component: IframePageComponent },
  { path: 'mainpage', component: MainPageComponent },
  { path: '', redirectTo: '/mainpage', pathMatch: 'full' },
];
