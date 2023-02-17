import { Component } from '@angular/core';
import { experience } from '../../data';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
  experience = experience;
}
