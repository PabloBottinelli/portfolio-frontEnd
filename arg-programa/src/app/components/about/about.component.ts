import { Component } from '@angular/core';
import { about } from '../../data';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  about = about;
}
