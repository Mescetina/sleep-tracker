import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OvernightSleepPage } from './overnight-sleep.page';

describe('OvernightSleepPage', () => {
  let component: OvernightSleepPage;
  let fixture: ComponentFixture<OvernightSleepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvernightSleepPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OvernightSleepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
