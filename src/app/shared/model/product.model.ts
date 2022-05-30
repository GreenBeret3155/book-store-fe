import { AuthorModel } from "./author.model"
import { CategoryModel } from "./category.model";

export interface IProductModel {
  allTimeQuantitySold?: string,
  author?: AuthorModel,
  category?: CategoryModel,
  description?: string,
  discount?: number,
  discountRate?: number,
  favouriteCount?: number,
  id?: number,
  inventoryStatus?: string,
  inventoryType?: string,
  name?: string,
  originalPrice?: number,
  price?: number,
  productsetGroupName?: string,
  ratingAverage?: number,
  shortDescription?: string,
  sourceId?: number,
  thumbnailUrl?: string,
  }
  
  export class ProductModel implements IProductModel {
    constructor(public allTimeQuantitySold?: string,
                public author?: AuthorModel,
                public category?: CategoryModel,
                public description?: string,
                public discount?: number,
                public discountRate?: number,
                public favouriteCount?: number,
                public id?: number,
                public inventoryStatus?: string,
                public inventoryType?: string,
                public name?: string,
                public originalPrice?: number,
                public price?: number,
                public productsetGroupName?: string,
                public ratingAverage?: number,
                public shortDescription?: string,
                public sourceId?: number,
                public thumbnailUrl?: string) {
    }
  }
  