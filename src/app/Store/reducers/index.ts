import * as formUser from "./user.reducer";
import {ActionReducerMap, createSelector} from "@ngrx/store";


export interface RootReducerState {
  users: formUser.UserReducerState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  users: formUser.UserReducer
}



export const getUserState = (state: RootReducerState) => state.users


export const getUserLoaded = createSelector(getUserState, formUser.getLoaded)
export const getUserLoading = createSelector(getUserState, formUser.getLoading)
export const getUsers = createSelector(getUserState, formUser.getUsers)
export const getUserError = createSelector(getUserState, formUser.getError)
