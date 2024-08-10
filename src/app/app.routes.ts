import { Routes } from '@angular/router';
import { AboutComponent } from './screens/about/about.component';
import { HelpComponent } from './screens/help/help.component';
import { HomeComponent } from './screens/home/home.component';
import { StartComponent } from './screens/start/start.component';
import { PresentationComponent } from './screens/presentation/presentation.component';
import { QuestionComponent } from './screens/question/question.component';
import { TextComponent } from './screens/text/text.component';
import { TopicComponent } from './screens/topic/topic.component';
import { VideoComponent } from './screens/video/video.component';
import { ContentSwitcherComponent } from './screens/content-switcher/content-switcher.component';

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'home', component: HomeComponent },
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'presentation', component: PresentationComponent},
  { path: 'question', component: QuestionComponent},
  { path: 'topic', component: TopicComponent },
  { path: 'text', component: TextComponent },
  { path: 'video', component: VideoComponent },
  { path: 'content-switcher/:phaseId', component: ContentSwitcherComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' }
];
