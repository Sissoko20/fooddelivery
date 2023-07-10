import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPlatAfricainsPage } from './details-plat-africains.page';

describe('DetailsPlatAfricainsPage', () => {
  let component: DetailsPlatAfricainsPage;
  let fixture: ComponentFixture<DetailsPlatAfricainsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DetailsPlatAfricainsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
