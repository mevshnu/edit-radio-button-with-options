import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  id = ""
  name = ""
  descriptions = ""
  tick = false
  tickdata = ""
  sho = true
  selectedOption: boolean = false;

  viewData = () => {
    this.api.viewAll().subscribe(
      (response: any) => {
        this.TestData = response
      }
    )
  }


  ngOnInit(){
    this.selectedOption = false;
  }
  constructor(private api: ApiService, private route: Router) {
    this.viewData()

  }
  getsho = (values: any) => {
    this.sho = values;
    console.log(this.sho)
  }


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

    console.log(this.selectedOption)
    this.api.editDetails(data).subscribe(
      (response: any) => {
        if (response.status == "success") {

          this.route.navigate(["/"])
            .then(() => {
              this.viewData()
            });

        } else {
          alert("Error in editing ")
          this.route.navigate(["/"])
            .then(() => {
              
              window.location.reload();
            });
        }

      }
    )
  }

  handleClear() {
    this.id = "";
    this.name = "";
    this.descriptions = "";
    this.tickdata = "";
  }
  editBtnClick = (id: any) => {
    this.api.getById({ "id": id }).subscribe(
      (response: any) => {
        console.log(response)
        this.id = response[0].id
        this.name = response[0].name
        this.descriptions = response[0].descriptions
        this.selectedOption = response[0].tick
        if (this.selectedOption) {
          this.tickdata = response[0].tickdata
        }

      }
    )

    console.log(this.tick);
  }

  TestData: any = []







}