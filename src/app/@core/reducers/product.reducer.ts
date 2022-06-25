import { Action } from '@ngrx/store'
import { AuthorModel } from '../../shared/model/author.model';
import { CategoryModel } from '../../shared/model/category.model';
import { ProductModel } from '../../shared/model/product.model'
import { CartService } from '../../shared/services/main/cart.service';
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

// const reducerProduct = (obj,curr: ProductModel) => {
//   if(curr.id){
//     if(obj[curr.id]){
//       obj[curr.id].quantity ++;
//     } else {
//       obj[curr.id]=curr;
//     }
//   }
//   return obj;
// }

const reducerProduct = (curr: ProductModel[], newProduct: ProductModel) => {
  if(!newProduct.quantity) newProduct.quantity = 1;
  
  for(let i = 0; i < curr.length; i++){
    if(curr[i].id == newProduct.id){
      curr[i].quantity += newProduct.quantity;
      return [...curr]
    }
  }
  return [...curr, newProduct];
}

// Section 2
export function productReducer(state: ProductModel[] = [], action: ProductActions.Actions) {

    // Section 3
    switch(action.type) {
        case ProductActions.INIT_PRODUCT:
          return action.payload;
        case ProductActions.ADD_PRODUCT:          
          return reducerProduct(state, action.payload);
        case ProductActions.REPLACE_PRODUCT:
          for(let i = 0; i< state.length; i++){
            if(state[i].id == action.payload.id){
              state[i] = action.payload
              return [...state]
            }
          }
          return [...state, action.payload]
        case ProductActions.UNSELECT_PRODUCT:          
          return state.map(e => { e.isSelected = false; return e; });
        default:
          return state;
    }
}