import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {
  constructor(private router: Router) {}

  navigate(screen: string): void {
    this.router.navigate([`/${screen}`]);
  }
}
