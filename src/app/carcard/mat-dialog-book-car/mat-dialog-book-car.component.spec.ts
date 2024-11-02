import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogBookCarComponent } from './mat-dialog-book-car.component';

describe('MatDialogBookCarComponent', () => {
  let component: MatDialogBookCarComponent;
  let fixture: ComponentFixture<MatDialogBookCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogBookCarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatDialogBookCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
