// Section 1
import { Action } from '@ngrx/store'
import { IUserModel } from '../../shared/model/user.model'

// Section 2
export const ADD_USER = '[USER] Add'

// Section 3
export class AddUser implements Action {
    readonly type = ADD_USER

    constructor(public payload: IUserModel) {}
}

// Section 4
export type Actions = AddUser;