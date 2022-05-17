export interface IRangeColor {
  name?: string;
  kpiId?: number;
  colorCode?: string;
  totalLevel?: number;
  classLevel?: number;
  fromValue?: number;
  toValue?: number;
}

export class RangeColor implements IRangeColor {
  name?: string;
  kpiId?: number;
  colorCode?: string;
  totalLevel?: number;
  classLevel?: number;
  fromValue?: number;
  toValue?: number;
}
