export interface IProfileConfig {
  id?: number;
  profileCode?: string;
  profileName?: string;
  isDefault?: number;
  orderIndex?: number;
  roleCode?: string;
  type?: number;
  status?: number;
  description?: string;
  updateTime?: Date;
  updateUser?: string;
  configProfileDTOs?: any[];
}

export class ProfileConfig implements IProfileConfig {
  constructor(
    id?: number,
    profileCode?: string,
    profileName?: string,
    isDefault?: number,
    orderIndex?: number,
    roleCode?: string,
    status?: number,
    type?: number,
    description?: string,
    updateTime?: Date,
    updateUser?: string,
    configProfileDTOs?: any[],
  ) {
    configProfileDTOs = [];
  }
}

