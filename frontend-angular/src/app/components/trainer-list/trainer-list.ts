import { Component, Input } from '@angular/core';
import { Trainer } from '../../models/Trainer';

@Component({
  selector: 'app-trainer-list',
  templateUrl: './trainer-list.html',
})
export class TrainerListComponent {
  @Input() trainers: Trainer[] = [];
}
