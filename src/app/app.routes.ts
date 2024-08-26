import { Routes } from '@angular/router';
import { AboutComponent } from './components/screens/about/about.component';
import { HelpComponent } from './components/screens/help/help.component';
import { HomeComponent } from './components/screens/home/home.component';
import { StartComponent } from './components/screens/start/start.component';
import { ContentCarouselComponent } from './components/screens/content-carousel/content-carousel.component';

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'home', component: HomeComponent },
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'phases/:id', component:ContentCarouselComponent},
  { path: '', redirectTo: '/start', pathMatch: 'full' }
];
