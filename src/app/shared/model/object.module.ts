// tslint:disable-next-line:no-empty-interface
export interface IObjectForm {
  objectCode?: string;
  objectName?: string;
}

export class  ObjectForm implements IObjectForm {
  constructor(
    objectCode?: string,
    objectName?: string) {
  }
}
