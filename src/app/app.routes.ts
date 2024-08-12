import { Routes } from '@angular/router';
import { AboutComponent } from './screens/about/about.component';
import { HelpComponent } from './screens/help/help.component';
import { HomeComponent } from './screens/home/home.component';
import { StartComponent } from './screens/start/start.component';
import { QuestionComponent } from './screens/question/question.component';
import { TextComponent } from './screens/text/text.component';
import { TopicComponent } from './screens/topic/topic.component';
import { VideoComponent } from './screens/video/video.component';
import { PhasesPresentationComponent } from './screens/phases-presentation/phases-presentation.component';
import { QuestionsPresentationComponent } from './screens/questions-presentation/questions-presentation.component';

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'home', component: HomeComponent },
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'phases-presentation', component: PhasesPresentationComponent},
  { path: 'questions-presentation', component: QuestionsPresentationComponent},
  { path: 'question', component: QuestionComponent},
  { path: 'topic', component: TopicComponent },
  { path: 'text', component: TextComponent },
  { path: 'video', component: VideoComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' }
];
