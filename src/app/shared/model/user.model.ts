import { ModuleItemModel } from "./module-item.model";


export interface IUserModel {
  id?: number,
  login?: string,
  activated?: boolean,
  ities?: Array<string>,
  email?: string,
  firstName?: string,
  imageUrl?: string,
  lastName?: string,
  avatar?: string,
  modules?: ModuleItemModel[]
}

export class UserModel implements IUserModel {
  constructor(public id?: number,
    public login?: string,
    public activated?: boolean,
    public authorities?: Array<string>,
    public email?: string,
    public firstName?: string,
    public imageUrl?: string,
    public lastName?: string,
    public avatar?: string,
    public modules?: ModuleItemModel[]) {
  }
}