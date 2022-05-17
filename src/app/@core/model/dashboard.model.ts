export interface IDashboard {
  id?: number;
  name?: string;
}

export class Dashboard implements IDashboard {
  constructor(public id?: number, public name?: string) {
  }
}
