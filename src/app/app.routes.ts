import { Routes } from '@angular/router';
import { AboutComponent } from './screens/about/about.component';
import { HelpComponent } from './screens/help/help.component';
import { HomeComponent } from './screens/home/home.component';
import { StartComponent } from './screens/start/start.component';

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'home', component: HomeComponent },
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' }
];
