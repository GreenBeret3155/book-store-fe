export interface IAreaAlarm {
  id?: number;
  parentCode?: string;
  parentName?: string;
  objectCode?: string;
  objectName?: string;
  locationLevel?: number;
  centerLoc?: string;
  southLoc?: string;
  northLoc?: string;
  northPole?: string;
  geometry?: any;
  status?: number;
  borderColor?: string;
  areaColor?: string;
}

export class AreaAlarm implements IAreaAlarm {
  constructor() {
  }

  id?: number;
  parentCode?: string;
  parentName?: string;
  objectCode?: string;
  objectName?: string;
  locationLevel?: number;
  centerLoc?: string;
  southLoc?: string;
  northLoc?: string;
  northPole?: string;
  geometry?: any;
  status?: number;
  borderColor?: string;
  areaColor?: string;
}
