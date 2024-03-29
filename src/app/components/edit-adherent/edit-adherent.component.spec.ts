import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdherentComponent } from './edit-adherent.component';

describe('EditAdherentComponent', () => {
  let component: EditAdherentComponent;
  let fixture: ComponentFixture<EditAdherentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAdherentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAdherentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
