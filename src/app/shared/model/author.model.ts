export interface IAuthorModel {
id?: number
name?: string
slug?: string
sourceId?: number
}

export class AuthorModel implements IAuthorModel {
  constructor(public id?: number,
              public name?: string,
              public slug?: string,
              public sourceId?: number) {
  }
}
