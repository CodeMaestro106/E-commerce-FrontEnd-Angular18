import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../store/load/load.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoadingComponent {
  constructor(public loader: LoaderService) {}
}
