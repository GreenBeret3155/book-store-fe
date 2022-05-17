export interface ICatItem {
  id?: number;
  itemId?: number;
  itemCode?: string;
  itemName?: string;
  itemValue?: string;
  categoryId?: string;
  categoryCode?: string;
  tableName?: string;
  position?: number;
  description?: string;
  editable?: number;
  parentItemId?: number;
  status?: number;
  updateTime?: string;
  updateUser?: string;
}

export class CatItemModel implements ICatItem {
  constructor() {
  }

  categoryCode: string;
  categoryId: string;
  description: string;
  editable: number;
  id: number;
  itemCode: string;
  itemId: number;
  itemName: string;
  itemValue: string;
  tableName: string;
  parentItemId: number;
  position: number;
  status: number;
  updateTime: string;
  updateUser: string;
}
