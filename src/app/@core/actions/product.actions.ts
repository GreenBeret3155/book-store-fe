// Section 1
import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'
import { IProductModel } from '../../shared/model/product.model'

// Section 2
export const ADD_PRODUCT       = '[PRODUCT] Add'
export const REPLACE_PRODUCT    = '[PRODUCT] Replace'
export const UNSELECT_PRODUCT    = '[PRODUCT] Unselect'

// Section 3
export class AddProduct implements Action {
    readonly type = ADD_PRODUCT

    constructor(public payload: IProductModel) {}
}

export class ReplaceProduct implements Action {
    readonly type = REPLACE_PRODUCT

    constructor(public payload: IProductModel) {}
}

export class UnselectAllProduct implements Action {
    readonly type = UNSELECT_PRODUCT

    constructor() {}
}

// Section 4
export type Actions = AddProduct | ReplaceProduct | UnselectAllProduct;