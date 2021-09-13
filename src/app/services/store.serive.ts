import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {getUserError, getUserLoaded, getUserLoading, getUsers, RootReducerState} from "../Store/reducers";
import {combineLatest, Observable} from "rxjs";
import {
  UserAddAction,
  UserDeleteAction,
  UserListErrorAction,
  UserListRequestAction,
  UserListSuccessAction, UserUpdateAction
} from "../Store/actions/user.action";
import {ApiService} from "./api.service";
import {User} from "../models/user";
import {take} from "rxjs/operators";

@Injectable()
export class StoreSerive {
  constructor(private store: Store<RootReducerState>, private apiService: ApiService) {
  }

  getUserList(force=false): [Observable<User[]>, Observable<boolean>, Observable<boolean>]{
    const loading$ = this.store.select(getUserLoading)
    const loaded$ = this.store.select(getUserLoaded)
    const getUserData = this.store.select(getUsers)
    const getError$ = this.store.select(getUserError)
    combineLatest([loading$, loaded$]).pipe(take(1)).subscribe(data => {
      if (!data[0] && !data[1] || force) {
        this.store.dispatch(new UserListRequestAction())
        this.apiService.getAllPost().subscribe(res => {
          this.store.dispatch(new UserListSuccessAction({data: res}))
        }, error => {
          this.store.dispatch(new UserListErrorAction())
        })
      }
    })

    return [getUserData, loading$, getError$]
  }

  updateUser(data: User) {
    this.store.dispatch(new UserDeleteAction({id: data.id}))
    this.store.dispatch(new UserUpdateAction({data}))
  }

  addUser(data: User) {
    this.store.dispatch(new UserAddAction({data}))
  }

  deleteUser(id: number) {
    this.store.dispatch(new UserDeleteAction({id}))
  }
}
