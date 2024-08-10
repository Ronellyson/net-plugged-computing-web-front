import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-screen-navigator',
  standalone: true,
  imports: [
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    NgClass
  ],
  templateUrl: './screen-navigator.component.html',
  styleUrls: ['./screen-navigator.component.scss']
})
export class ScreenNavigatorComponent {
  currentRoute: string = '';

  constructor(private router: Router, private route: ActivatedRoute) {
    // Update currentRoute whenever the route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  navigate(screen: string): void {
    this.router.navigate([`/${screen}`]);
  }

  isActive(screen: string): boolean {
    return this.currentRoute === `/${screen}`;
  }
}
