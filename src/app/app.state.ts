import { ModuleItemModel } from './shared/model/module-item.model';
import { ProductModel } from './shared/model/product.model';
import { UserModel } from './shared/model/user.model';

export interface AppState {
  readonly products: ProductModel[];
  readonly user: UserModel;
  readonly moduleItem: ModuleItemModel[];
}