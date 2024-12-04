import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../base/BaseComponent';

@Component({
  selector: 'app-notfound',
  standalone: false,
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
})
export class NotFoundComponent extends BaseComponent implements OnInit {
  constructor(injector: Injector) {
    super(injector);
  }
  ngOnInit() {}
}
