import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./containers/users.component";
import {PostComponent} from "./containers/post.component";

const routes: Routes = [
    {path: '', component: UserComponent},
    {path:'post', component: PostComponent}
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
