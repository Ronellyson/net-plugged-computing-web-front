import { Routes } from '@angular/router';
import { AboutComponent } from './screens/about/about.component';
import { HelpComponent } from './screens/help/help.component';
import { HomeComponent } from './screens/home/home.component';
import { StartComponent } from './screens/start/start.component';
import { QuestionComponent } from './screens/question/question.component';
import { TextComponent } from './screens/text/text.component';
import { VideoComponent } from './screens/video/video.component';
import { PhasesPresentationComponent } from './screens/phases-presentation/phases-presentation.component';
import { QuestionsPresentationComponent } from './screens/questions-presentation/questions-presentation.component';
import { ImageComponent } from './screens/image/image.component';

export const routes: Routes = [
  { path: 'start', component: StartComponent },
  { path: 'home', component: HomeComponent },
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: 'phases-presentation/:phaseId', component: PhasesPresentationComponent },
  { path: 'questions-presentation/:phaseId', component: QuestionsPresentationComponent },
  { path: 'question/:phaseId/:topicIndex/:contentIndex', component: QuestionComponent },
  { path: 'text/:phaseId/:topicIndex/:contentIndex', component: TextComponent },
  { path: 'video/:phaseId/:topicIndex/:contentIndex', component: VideoComponent },
  { path: 'image/:phaseId/:topicIndex/:contentIndex', component: ImageComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' }
];
