import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-screen-navigator',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './screen-navigator.component.html',
  styleUrls: ['./screen-navigator.component.scss']
})
export class ScreenNavigatorComponent {
  constructor(private router: Router) {}

  navigate(screen: string): void {
    this.router.navigate([`/${screen}`]);
  }
}
