export interface IReport {
  'id' ?:  any,
  'name' ?: any,
  'code' ?: any,
  'categoryId' ?: any,
  'fileName' ?: any,
  'path' ?: any,
  'content' ?: any,
  'description' ?: any,
  'status' ?: any,
  'updateTime' ?: any,
  'updateUser' ?: any,
  'file' ?: any,
}

export class ReportModel implements IReport {
  constructor(
  id ?:  any,
  name ?: any,
  code ?: any,
  categoryId ?: any,
  fileName ?: any,
  path ?: any,
  content ?: any,
  description ?: any,
  status ?: any,
  updateTime ?: any,
  updateUser ?: any,
  file ?: any,
  ) {
  }
}

