// tslint:disable-next-line:no-empty-interface
export interface IConfigMenuItem {
  id?: number;
  menuItemCode?: String;
  menuItemName?: String;
  menuName?: String;
  chartNames?: String;
  isDefault?: number;
  orderIndex?: number;
  menuId?: number;
  chartIds?: any[];
  configCharts?: any[];
  status?: number;
  description?: String;
  updateTime?: Date;
  updateUser?: String;
}

export class ConfigMenuItem implements IConfigMenuItem {
  constructor(
    id?: number,
    menuItemCode?: String,
    menuItemName?: String,
    menuName?: String,
    chartNames?: String,
    isDefault?: number,
    orderIndex?: number,
    menuId?: number,
    chartIds?: any[],
    configCharts?: any[],
    status?: number,
    description?: String,
    updateTime?: Date,
    updateUser?: String
  ) {
  }
}
