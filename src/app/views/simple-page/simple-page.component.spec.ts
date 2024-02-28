import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import Page from '@/views/simple-page/simple-page.component';
import DataService from '@/services/data.service';

describe('views.simple-page', () => {
  let fixture: ComponentFixture<Page>;
  let component: Page;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, BrowserAnimationsModule, Page]
    }).compileComponents();
    TestBed.inject(DataService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Page);
    fixture.detectChanges();
    component = fixture.componentInstance;
  });

  it('should create component.', async () => {
    expect(component).toBeDefined();
  });

  // it('should choose values and submit.', async () => {
  //   const modelId = '67352';
  //   const select = fixture.debugElement.query(By.css('mat-select'));
  //   console.log(select);
  //   select.triggerEventHandler('selectionChange', { value: modelId });
  //   fixture.detectChanges();
  //   expect(component.calculatedValues?.auctionValue).toBe(100);
  // });

});
