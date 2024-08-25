import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-text-content',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent {
  @Input() phaseNumber$!: Observable<number>;
  @Input() topicName$!: Observable<string | undefined>;
  @Input() icon$!: Observable<string | undefined>;
  @Input() contentText$!: Observable<string | undefined>;
}
