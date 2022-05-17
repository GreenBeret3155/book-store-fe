import { Moment } from 'moment';

export interface IMonitorQueryKpi {
  id?: number;
  queryKpiId?: number;
  status?: number;
  runTimeSucc?: Moment;
  updateTime?: Moment;
}

export class MonitorQueryKpi implements IMonitorQueryKpi {
  constructor(
    public id?: number,
    public queryKpiId?: number,
    public status?: number,
    public runTimeSucc?: Moment,
    public updateTime?: Moment
  ) {}
}
