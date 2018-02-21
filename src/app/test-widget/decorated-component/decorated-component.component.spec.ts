import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratedComponentComponent } from './decorated-component.component';

describe('DecoratedComponentComponent', () => {
  let component: DecoratedComponentComponent;
  let fixture: ComponentFixture<DecoratedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecoratedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoratedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
