import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclebinComponent } from './recyclebin.component';

describe('RecyclebinComponent', () => {
  let component: RecyclebinComponent;
  let fixture: ComponentFixture<RecyclebinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecyclebinComponent]
    });
    fixture = TestBed.createComponent(RecyclebinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
