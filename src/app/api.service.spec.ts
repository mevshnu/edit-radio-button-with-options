import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { AppComponent } from './app.component';


describe('ApiService', () => {
  let service: ApiService;

  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], 
      providers: [ApiService]});
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController); // code added by j
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
  
  // it('should have getData function', () => {
  //   const service: ApiService = TestBed.get(ApiService);
  //   expect(service.getData).toBeTruthy();
  //  });

   

  it('should send a PUT request to the server to edit details', () => {
    const data = {id: 1, name: 'Test Details', description: 'This is a test', tick: true, tickData: 'Test data'};

    service.editDetails(data).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne('http://localhost:8080/editDetails');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(data);
    req.flush({});
  });


  it('should send a GET request to the server with the given ID parameter', () => {
    const id = 123;
    const expectedUrl = `http://localhost:8080/getbyid/${id}`;

    service.getById(id).subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

  it('should send a GET request to the server to retrieve all data', () => {
    const expectedUrl = 'http://localhost:8080/viewAll';

    service.viewAll().subscribe(response => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush({});
  });

 

});
