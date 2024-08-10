import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HelpScreenComponent } from './help-screen/help-screen.component';
import { AboutScreenComponent } from './about-screen/about-screen.component';

export const routes: Routes = [
  { path: 'start', component: StartScreenComponent },
  { path: 'home', component: HomeScreenComponent },
  { path: 'help', component: HelpScreenComponent },
  { path: 'about', component: AboutScreenComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' }
];
