import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { DemoComponent } from './demo/demo.component';

const routes:Routes =[
  {
    path:"task",
    component: EditComponent
  },
  {
    path:"",
    component: DemoComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
