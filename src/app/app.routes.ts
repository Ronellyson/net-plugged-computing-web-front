import { Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';

export const routes: Routes = [
    {
      path: "",
      component: StartScreenComponent,
    },
    {
      path: "home",
      component: HomeScreenComponent
    }
];
