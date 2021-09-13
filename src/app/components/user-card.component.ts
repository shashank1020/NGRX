import {Component, Input} from "@angular/core";
import {User} from "../models/user";
import {StoreSerive} from "../services/store.serive";
import {MatDialog} from "@angular/material/dialog";
import {UpdateUserComponent} from "./update-user.component";

@Component({
  selector: 'user-card',
  template: `
    <mat-card fxLayout="column" fxLayoutGap="20px" fxLayoutAlign="start stretch" style="margin: 5px">
      <mat-card-title>{{ this.user.name }}</mat-card-title>
      <mat-card-content>Email: {{ this.user.email }}</mat-card-content>
      <mat-card-content>Username: {{ this.user.username }}</mat-card-content>
      <button (click)="delete()" color="warn" mat-raised-button>Delete</button>
      <button (click)="update()" mat-raised-button color="primary">Update</button>
    </mat-card>
  `,
  styles: [`

  `]
})
export class UserCardComponent {
  @Input() user!: User
  constructor(private storeService: StoreSerive,
              private dialog: MatDialog) {
  }

  delete() {
    this.storeService.deleteUser(this.user.id)
  }

  update() {
    this.dialog.open(UpdateUserComponent, {
      width: '276px',
      data: this.user
    })
  }
}
