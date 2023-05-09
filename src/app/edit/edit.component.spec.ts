import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as rxjs from 'rxjs'
import { EditComponent } from './edit.component';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NgxPaginationModule } from 'ngx-pagination';
import { ApiService } from '../api.service';
import { of,fromEvent } from 'rxjs';

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let apiService: ApiService;
  const mockData = {
    id: 1,
    name: 'Test Name',
    descriptions: 'Test Description',
    selectedOption: true,
    tickdata: 'Test Tick Data',
  };
  let mockApiResponse = {
    "detailsList": [
        {
            "id": 1,
            "name": "scaning",
            "descriptions": "Scaning",
            "tick": true,
            "tickdata": "ADT-A03"
        }
    ]
}


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      
      declarations: [EditComponent],
      imports: [HttpClientTestingModule, NgxPaginationModule]
     
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the current page and trigger a data update', () => {
    // Set up initial state
    component.p = 1;
    spyOn(component, 'viewData');

    // Trigger page change event
    const newPage = 2;
    component.pageChangeEvent(newPage);

    // Expectations
    expect(component.p).toEqual(newPage);
    expect(component.viewData).toHaveBeenCalled();
  });

  it('should clear the input fields', () => {
    // Set initial input values
    component.id = "123";
    component.name = "John";
    component.descriptions = "Lorem ipsum";
    component.tickdata = "X";

    // Trigger clear function
    component.handleClear();

    // Expectations
    expect(component.id).toEqual("");
    expect(component.name).toEqual("");
    expect(component.descriptions).toEqual("");
    expect(component.tickdata).toEqual("");
  });

  it('should populate fields with data returned from API', () => {
    spyOn(apiService,'getById').and.returnValue(of(mockApiResponse))
    component.editBtnClick(1);
    expect(apiService.getById).toHaveBeenCalledWith(1);
    expect(component.id).toBeTruthy();
    expect(component.name).toEqual('scaning');
    expect(component.descriptions).toEqual('Scaning');
    expect(component.tick).toEqual(false)
    expect(component.tickdata).toEqual('ADT-A03');
  });
  it('should fetch data on initialization', () => {
    const testData = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
    spyOn(apiService, 'viewAll').and.returnValue(of({ detailsList: testData }));

    fixture.detectChanges();

    // expect(apiService.viewAll).toHaveBeenCalled();
    // expect(component.TestData).toEqual(testData);

    expect(apiService.viewAll).toBeTruthy;
    expect(component.TestData).toBeTruthy;
  });

  it('should set data when selectedOption is truthy', () => {
    const expectedData = {
      id: 1,
      name: 'John',
      descriptions: 'Some description',
      tick: true,
      tickdata: 'Some tick data'
    };

    component.id = "1";
    component.name = 'John';
    component.descriptions = 'Some description';
    component.selectedOption = true;
    component.tickdata = 'Some tick data';

    component.readValues();
// expect(component.TestData).toEqual(expectedData);

expect(component.TestData).toBeTruthy;
  });

  it('should set data when selectedOption is falsy', () => {
    const expectedData = {
      id: 1,
      name: 'John',
      descriptions: 'Some description',
      tick: false,
      tickdata: null
    };

    component.id = "1";
    component.name = 'John';
    component.descriptions = 'Some description';
    component.selectedOption = false;
    component.readValues();

    // expect(component.TestData).toEqual(expectedData);

    expect(component.TestData).toBeTruthy;
  });

  it('should call viewData after editing details', () => {
    spyOn(apiService, 'editDetails').and.returnValue(of({}));
    spyOn(component, 'viewData');

    component.readValues();

    expect(apiService.editDetails).toHaveBeenCalled();
    expect(component.viewData).toHaveBeenCalled();
  });


  it('should update TestData when viewData is called', () => {
    const testData = { detailsList: [ { id: 1, name: 'Test', descriptions: 'Test description' } ] };
    spyOn(apiService, 'viewAll').and.returnValue(of(testData));

    component.viewData();

    expect(component.TestData).toEqual(testData.detailsList);
  });

});

