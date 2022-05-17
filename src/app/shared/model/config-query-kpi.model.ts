import { Moment } from 'moment';

export interface IConfigQueryKpi {
  id?: number;
  timeType?: number;
  inputLevel?: number;
  queryData?: string;
  queryCheckData?: string;
  status?: number;
  description?: string;
  updateTime?: Moment;
  updateUser?: string;
  listParentInputLevel?: string;
}

export class ConfigQueryKpi implements IConfigQueryKpi {
  constructor(
    public id?: number,
    public timeType?: number,
    public inputLevel?: number,
    public queryData?: string,
    public queryCheckData?: string,
    public status?: number,
    public description?: string,
    public updateTime?: Moment,
    public updateUser?: string,
    public listParentInputLevel?: string
  ) {}
}
