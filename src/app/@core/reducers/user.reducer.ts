import { Action } from '@ngrx/store'
import { AuthorModel } from '../../shared/model/author.model';
import { CategoryModel } from '../../shared/model/category.model';
import { ProductModel } from '../../shared/model/product.model'
import { UserModel } from '../../shared/model/user.model';
import * as UserActions from '../actions/user.actions'

export function userReducer(state: UserModel, action: UserActions.Actions) {

  switch(action.type) {
    case UserActions.ADD_USER:
      return action.payload;
    case UserActions.CLEAR_USER:
      return null;
    default:
      return state;
  }
}