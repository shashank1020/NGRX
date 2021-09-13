import {Component, OnDestroy, OnInit} from "@angular/core";
import {User} from "../models/user";
import {StoreSerive} from "../services/store.serive";
import {takeWhile} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {UpdateUserComponent} from "../components/update-user.component";

@Component({
  selector: 'users',
  template: `
    <button (click)="addUser()" *ngIf="!error && !loading" mat-raised-button color="primary" style="margin: 5px; margin-bottom: 10px">Add a new User</button>
    <div fxLayout="column" fxLayoutGap="10px" fxLayoutAlign="start center">
      <user-list *ngIf="!this.loading && !this.error" [users]="this.users"></user-list>
      <mat-spinner *ngIf="loading"></mat-spinner>
      <error (reload)="this.tryAgain()" *ngIf="this.error && !loading"></error>
    </div>
  `,
  styles: [``]
})
export class UserComponent implements OnInit, OnDestroy {
  users: User[] = []
  loading = false
  error = false
  isAlive = true
  constructor(private storeService: StoreSerive,
              private dialog: MatDialog) {
  }

  addUser() {
    this.dialog.open(UpdateUserComponent, {
      width: '276px'
    })
  }

  ngOnInit() {
    this.fetchData();
    this.isAlive = true
  }
  ngOnDestroy() {
    this.isAlive = true
  }

  tryAgain() {
    this.storeService.getUserList(true);
  }
  fetchData() {
    const observer$ = this.storeService.getUserList()
    const userData$ = observer$[0]
    const loading$ = observer$[1]
    const error$ = observer$[2]
    userData$.pipe(takeWhile(() => this.isAlive)).subscribe(data => {
      this.users = data
      console.log(data);
    })
    loading$.pipe(takeWhile(() => this.isAlive)).subscribe(data => this.loading = data)
    error$.pipe(takeWhile(() => this.isAlive)).subscribe((data => this.error = data))
  }
}
