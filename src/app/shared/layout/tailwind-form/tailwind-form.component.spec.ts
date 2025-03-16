import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailwindFormComponent } from './tailwind-form.component';

describe('TailwindFormComponent', () => {
  let component: TailwindFormComponent;
  let fixture: ComponentFixture<TailwindFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailwindFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailwindFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
