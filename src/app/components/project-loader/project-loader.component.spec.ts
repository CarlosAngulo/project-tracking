import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectLoaderComponent } from './project-loader.component';

describe('ProjectLoaderComponent', () => {
  let component: ProjectLoaderComponent;
  let fixture: ComponentFixture<ProjectLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
