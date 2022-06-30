import { AuthorModel } from "./author.model"
import { CategoryModel } from "./category.model";

export interface IModuleItemModel {
  id?: number,
  code?: string,
  name?: string,
  title?: string,
  description?: string,
  status?: number,
  updateTime?: string,
  parentId?: number,
  pathUrl?: string,
  link?: string,
  icon?: string,
  position?: number,
  remove?:boolean,
  children?: ModuleItemModel[]
}

export class ModuleItemModel implements IModuleItemModel {
  constructor(public id?: number,
    public code?: string,
    public name?: string,
    public title?: string,
    public description?: string,
    public status?: number,
    public updateTime?: string,
    public parentId?: number,
    public pathUrl?: string,
    public link?: string,
    public icon?: string,
    public position?: number,
    public remove?:boolean,
    public children?: ModuleItemModel[]) {
  }
}