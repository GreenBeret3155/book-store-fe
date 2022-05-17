export interface IDashboardConfig {
  id?: number;
  screenCode?: string;
  screenName?: string;
  isDefault?: number;
  parentId?: number;
  orderIndex?: number;
  profileId?: number;
  profileType?: number;
  menuItemId?: number;
  status?: number;
  description?: string;
  updateTime?: Date;
  updateUser?: string;
  menuItem?: any;
  configAreaDTOs?: any[];
}

export class DashboardConfig implements IDashboardConfig {
  constructor(
    id?: number,
    screenCode?: string,
    screenName?: string,
    isDefault?: number,
    parentId?: number,
    orderIndex?: number,
    profileId?: number,
    profileType?: number,
    menuItemId?: number,
    status?: number,
    description?: string,
    updateTime?: Date,
    updateUser?: string,
    menuItem?: any,
    configAreaDTOs?: any[],
  ) {
    configAreaDTOs = [];
  }
}

