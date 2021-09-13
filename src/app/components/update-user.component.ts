import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {User} from "../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {StoreSerive} from "../services/store.serive";

@Component({
  selector: 'update-user',
  template: `
    <form [formGroup]="userForm" (ngSubmit)="this.userForm.valid && this.addOrUpdateUser()">
      <div fxLayout="column" fxLayoutAlign="center stretch">
        <mat-form-field class = 'my-3'>
          <input formControlName="email" matInput placeholder="Email"/>
          <mat-error>Valid email is Required </mat-error>
        </mat-form-field>
        <mat-form-field class = 'my-3'>
          <input formControlName="name" matInput placeholder="Name"/>
          <mat-error> Username is Required </mat-error>
        </mat-form-field>
        <button type="submit" mat-raised-button color="primary">{{this.data? 'Update': 'Add'}}</button>
      </div>
    </form>
  `,
  styles: [`.my-3 {
    margin-top: 3px;
    margin-bottom: 3px;
  } `]
})
export class UpdateUserComponent implements OnInit {
  userForm!: FormGroup

  constructor(private dialog: MatDialogRef<UpdateUserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: User,
              private storeService: StoreSerive) {
    console.log(data)
  }

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(this.data ? this.data.name : null, Validators.required),
      email: new FormControl(this.data ? this.data.email : null, Validators.required)
    })
  }

  addOrUpdateUser() {
    if(this.data) this.updateUser()
    else this.addUser()
    this.dialog.close()
  }

  addUser() {
    this.storeService.addUser(this.userForm.value)
  }

  updateUser() {
    const updatedUser = {...this.data, ...this.userForm.value}
    this.storeService.updateUser(updatedUser)
    this.dialog.close()
  }
}
