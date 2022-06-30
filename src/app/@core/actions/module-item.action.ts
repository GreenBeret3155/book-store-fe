// Section 1
import { Action } from '@ngrx/store'
import { IModuleItemModel } from '../../shared/model/module-item.model';
import { IUserModel } from '../../shared/model/user.model'

// Section 2
export const INIT_MODULE = '[MODULE] Init'

// Section 3
export class InitModule implements Action {
    readonly type = INIT_MODULE

    constructor(public payload: IModuleItemModel[]) {}
}

// Section 4
export type Actions = InitModule;