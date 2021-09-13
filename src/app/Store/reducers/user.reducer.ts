import {User} from "../../models/user";
import {Actions} from "../actions";
import {
  USER_ADD,
  USER_DELETE,
  USER_LIST_ERROR,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_UPDATE
} from "../actions/user.action";

export interface UserReducerState {
  loading: boolean
  loaded: boolean
  error: boolean
  users: User[]
}

const initialState: UserReducerState = {
  loading: false,
  loaded: false,
  error: false,
  users: []
}


export function UserReducer(state = initialState, action: Actions): UserReducerState {
  switch (action.type) {
    case USER_LIST_REQUEST: {
      return {...state, loading: true}
    }
    case USER_DELETE: {
      const users = state.users.filter(data => data.id !== action.payload.id)
      return {...state, ...{users}}
    }
    case USER_UPDATE: {
      const updatedUser = state.users.concat(action.payload.data)
      return { ...state, ...{users: updatedUser}}
    }
    case USER_ADD: {
      const updatedUsers = state.users.concat(action.payload.data)
      return {...state, ...{users: updatedUsers}}
    }
    case USER_LIST_ERROR: {
      return {...state, error: true, loading: false}
    }
    case USER_LIST_SUCCESS: {
      const updatedUsers = state.users.concat(action.payload.data)
      return {...state, loading: false, loaded: true, users: updatedUsers, error: false}
    }
    default: {
      return state
    }
  }
}


// selectors

export const getLoading = (state: UserReducerState) => state.loading
export const getLoaded = (state: UserReducerState) => state.loaded
export const getUsers = (state: UserReducerState) => state.users
export const getError = (state: UserReducerState) => state.error
