import { Component } from '@angular/core';
import { proyects } from '../../data'

@Component({
  selector: 'app-proyects',
  templateUrl: './proyects.component.html',
  styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent {
  proyects = proyects;
}
