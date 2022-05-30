export interface ICategoryModel {
  id?: number, 
  sourceId?: number, 
  name?: string, 
  isLeaf?: number
  }
  
  export class CategoryModel implements ICategoryModel {
    constructor(public id?: number, 
                public sourceId?: number, 
                public name?: string, 
                public isLeaf?: number) {
    }
  }
  