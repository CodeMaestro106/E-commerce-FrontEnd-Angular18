import { Component, Injector } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-base',
  template: '', // Base component has no template
})
export class BaseComponent {
  protected location: Location;

  constructor(private injector: Injector) {
    this.location = this.injector.get(Location); // Get Location service from the Injector
  }

  goBack(): void {
    this.location.back(); // Navigates back to the previous page
  }
}
