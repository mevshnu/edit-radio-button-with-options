import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  editDetails = (data:any)=>
  {
    return this.http.put("http://localhost:8080/editDetails",data)
  }
  getById = (data:any)=>{
    console.log(data)
    return this.http.post("http://localhost:8080/getbyid",data)
  }
  viewAll = ()=>{
    return this.http.get("http://localhost:8080/viewAll")
  }
}
