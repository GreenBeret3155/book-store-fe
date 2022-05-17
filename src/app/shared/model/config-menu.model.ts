// tslint:disable-next-line:no-empty-interface
export interface IConfigMenu {
  id?: number;
  menuCode?: String;
  menuName?: String;
  domainCode?: String;
  orderIndex?: number;
  status?: number;
  description?: String;
  updateTime?: Date;
  updateUser?: String;
}

export class ConfigMenu implements IConfigMenu {
  constructor(
    id?: number,
    menuCode?: String,
    menuName?: String,
    domainCode?: String,
    orderIndex?: number,
    status?: number,
    description?: String,
    updateTime?: Date,
    updateUser?: String
  ) {
  }
}
