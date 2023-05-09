import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  
  // getData(getData: any) {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private http:HttpClient) { }
  editDetails = (data:any)=>
  {
    return this.http.put("http://localhost:8080/editDetails",data)
  }
  getById = (data:any)=>{
    console.log(data)
    return this.http.get("http://localhost:8080/getbyid/"+data)
  }
  viewAll = ()=>{
    return this.http.get("http://localhost:8080/viewAll")
  }
}
