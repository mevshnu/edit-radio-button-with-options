import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { HttpClientModule } from '@angular/common/http';
import {HttpClientTestingModule } from '@angular/common/http/testing'
import { PaginatePipe } from 'ngx-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditComponent ],
      imports: [ HttpClientTestingModule,NgxPaginationModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
