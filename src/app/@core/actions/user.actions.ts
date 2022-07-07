// Section 1
import { Action } from '@ngrx/store'
import { IUserModel } from '../../shared/model/user.model'

// Section 2
export const ADD_USER = '[USER] Add'

export const CLEAR_USER = '[USER] Clear'

// Section 3
export class AddUser implements Action {
    readonly type = ADD_USER

    constructor(public payload: IUserModel) {}
}

export class ClearUser implements Action {
    readonly type = CLEAR_USER

    constructor() {}
}

// Section 4
export type Actions = AddUser | ClearUser;