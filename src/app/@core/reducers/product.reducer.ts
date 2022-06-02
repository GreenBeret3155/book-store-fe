import { Action } from '@ngrx/store'
import { AuthorModel } from '../../shared/model/author.model';
import { CategoryModel } from '../../shared/model/category.model';
import { ProductModel } from '../../shared/model/product.model'
import * as ProductActions from '../actions/product.actions'

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
export function productReducer(state: ProductModel[] = [], action: ProductActions.Actions) {

    // Section 3
    switch(action.type) {
        case ProductActions.ADD_PRODUCT:
          return [...state, action.payload];
        default:
          return state;
    }
}