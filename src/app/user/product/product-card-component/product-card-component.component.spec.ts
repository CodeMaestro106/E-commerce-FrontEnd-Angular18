import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponentComponent } from './product-card-component.component';

describe('ProductCardComponentComponent', () => {
  let component: ProductCardComponentComponent;
  let fixture: ComponentFixture<ProductCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
