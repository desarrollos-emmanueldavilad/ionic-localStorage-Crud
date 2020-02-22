import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IonicStoragePage } from './ionic-storage.page';

describe('IonicStoragePage', () => {
  let component: IonicStoragePage;
  let fixture: ComponentFixture<IonicStoragePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicStoragePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IonicStoragePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
