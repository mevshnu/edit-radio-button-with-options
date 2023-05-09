import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { PaginatePipe } from 'ngx-pagination';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  
 
  p: number = 1;
  total: number = 0;
  id = ""
  name = ""
  descriptions = ""
  tick = false
  tickdata = ""
  sho = true
  selectedOption: boolean = false;
// function for updaing page ,which is called by readvalues
  viewData = () => {
    this.api.viewAll().subscribe(
      (response: any) => {
        this.TestData = response.detailsList
      }
    )
  }
  router: any;


  ngOnInit() {
    this.selectedOption = false;
  }
  constructor(private api: ApiService, private route: Router) {
    this.viewData()
  }
  // getsho = (values: any) => {
  //   this.sho = values;
    
  // }

  //updating values which is given by user
  readValues = () => {
    let data: any
    if (this.selectedOption) {
      data = {
        "id": this.id,
        "name": this.name,
        "descriptions": this.descriptions,
        "tick": this.selectedOption,
        "tickdata": this.tickdata
      }
    } else {
      data = {
        "id": this.id,
        "name": this.name,
        "descriptions": this.descriptions,
        "tick": this.selectedOption,
        "tickdata": null
      }
    }

    this.api.editDetails(data).subscribe(
      (response: any) => {
        this.viewData();
          
          // this.route.navigate(["/"])
          //   .then(() => {
          //    
          //   });
      }
    )
  }
  // clearing field on cancel button
  handleClear() {
    this.id = "";
    this.name = "";
    this.descriptions = "";
    this.tickdata = "";
  }
  // fetching detials of particular details 
  editBtnClick = (id: any) => {
    this.api.getById( id ).subscribe(
      (response: any) => {
        console.log(response)
        this.id = response.detailsList[0].id
        this.name = response.detailsList[0].name
        this.descriptions = response.detailsList[0].descriptions
        this.selectedOption = response.detailsList[0].tick
        if (this.selectedOption) {
          this.tickdata = response.detailsList[0].tickdata
        }

      }
    )

  }

  apiData:any = [];
  TestData: any = []

//pagination
  pageChangeEvent(event: number) {
    this.p = event;
    this.viewData();
  }


}