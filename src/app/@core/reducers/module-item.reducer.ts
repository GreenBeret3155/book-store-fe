import { Action } from '@ngrx/store'
import { AuthorModel } from '../../shared/model/author.model';
import { CategoryModel } from '../../shared/model/category.model';
import { ModuleItemModel } from '../../shared/model/module-item.model';
import { ProductModel } from '../../shared/model/product.model'
import * as ModuleItemActions from '../actions/module-item.action'

// Section 1
const initialState: ProductModel = {
  allTimeQuantitySold: '',
  author: new AuthorModel(),
  category: new CategoryModel(),
  description: '',
  discount: null,
  discountRate: null,
  favouriteCount: null,
  id: null,
  inventoryStatus: '',
  inventoryType: '',
  name: '',
  originalPrice: null,
  price: null,
  productsetGroupName: '',
  ratingAverage: null,
  shortDescription: '',
  sourceId: null,
  thumbnailUrl: '',
}

// Section 2
export function moduleItemReducer(state: ModuleItemModel[] = [], action: ModuleItemActions.Actions) {

    // Section 3
    switch(action.type) {
        case ModuleItemActions.INIT_MODULE:
          return action.payload;
        default:
          return state;
    }
}