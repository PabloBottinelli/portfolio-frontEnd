import { Component } from '@angular/core';
import { skills } from '../../data'

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  skills = skills;
}
