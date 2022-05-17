// tslint:disable-next-line:no-empty-interface
export interface IFavorite {
  id?: number;
  name?: String;
  urlLink?: String;
  updateTime?: Date;
  updateUser?: String;
}

export class Favorite implements IFavorite {
  id?: number;
  name?: String;
  urlLink?: String;
  updateTime?: Date;
  updateUser?: String;
}
