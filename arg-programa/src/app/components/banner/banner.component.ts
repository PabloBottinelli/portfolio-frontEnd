import { Component } from '@angular/core';
import { banner } from '../../data';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent {
  banner = banner;
}
