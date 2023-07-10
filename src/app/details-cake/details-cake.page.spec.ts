import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsCakePage } from './details-cake.page';

describe('DetailsCakePage', () => {
  let component: DetailsCakePage;
  let fixture: ComponentFixture<DetailsCakePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsCakePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
