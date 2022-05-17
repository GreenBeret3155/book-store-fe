import {TreeviewItem} from 'ngx-treeview';
import * as moment from 'moment';

// export function formatOrginazationData(data, parentId) {
//   const arr = [];
//   for (let i = 0; i < data.length; i++) {
//     const dataItem = {
//       text: data[i].orgName,
//       value: data[i].id,
//       parentId: data[i].parentId,
//       children: [],
//       checked: false
//     };
//     if (dataItem.parentId === parentId) {
//       const children = formatOrginazationData(data, dataItem.value);
//       if (children.length > 0) {
//         dataItem.children = children;
//       } else {
//         dataItem.children = null;
//       }
//       const dataTreeview = new TreeviewItem({
//         text: dataItem.text,
//         value: dataItem.value,
//         children: dataItem.children,
//         checked: dataItem.checked,
//         collapsed: true
//       });
//       arr.push(dataTreeview);
//     }
//   }
//   return arr.sort((a, b) => a.text.localeCompare(b.text, 'es', {sensitivity: 'base'}));
// }
//
// export function formatDataDept(data, parentId) {
//   const arr = [];
//   for (let i = 0; i < data.length; i++) {
//     const dataItem = {
//       text: data[i].orgName,
//       value: data[i].id,
//       parentId: data[i].parentId,
//       children: [],
//     };
//     if (dataItem.parentId === parentId) {
//       const children = formatDataDept(data, dataItem.value);
//       if (children.length > 0) {
//         dataItem.children = children;
//       } else {
//         dataItem.children = null;
//       }
//       const dataTreeview = new TreeviewItem({text: dataItem.text, value: dataItem.value, children: dataItem.children});
//       arr.push(dataTreeview);
//     }
//   }
//   return arr.sort((a, b) => a.text.localeCompare(b.text, 'es', {sensitivity: 'base'}));
// }
//
// export function formatDataParent(data, parentId) {
//   const arr = [];
//   for (let i = 0; i < data.length; i++) {
//     const dataItem = {
//       text: data[i].orgName,
//       value: data[i].id,
//       parentId: data[i].parentId,
//       children: [],
//     };
//     if (dataItem.parentId === parentId) {
//       const children = formatDataParent(data, dataItem.value);
//       if (children.length > 0) {
//         dataItem.children = children;
//       } else {
//         dataItem.children = null;
//       }
//       const dataTreeview = new TreeviewItem({text: dataItem.text, value: dataItem.value, children: dataItem.children});
//       arr.push(dataTreeview);
//     }
//   }
//   return arr;
// }

export function formatDataModule(data, parentId) {
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    const dataItem = data[i];
    if (dataItem.parentId === parentId) {
      let children = [];
      if (dataItem.id != null) {
        children = formatDataModule(data, dataItem.id);
      }
      if (children.length > 0) {
        dataItem.children = children;
      } else {
        dataItem.children = null;
      }
      const dataTreeview = new TreeviewItem({
        text: dataItem.text,
        value: dataItem.value,
        children: dataItem.children,
        checked: dataItem.checked,
        collapsed: true,
      });
      arr.push(dataTreeview);
    }
  }
  return arr;
}

// export function formatDataReport(data, parentId) {
//   const arr = [];
//   for (let i = 0; i < data.length; i++) {
//     const dataItem = {
//       text: data[i].reportName,
//       value: data[i].id,
//       parentId: data[i].parentId,
//       children: [],
//       checked: false
//     };
//     if (dataItem.parentId === parentId) {
//       const children = formatDataReport(data, dataItem.value);
//       if (children.length > 0) {
//         dataItem.children = children;
//       } else {
//         dataItem.children = null;
//       }
//       const dataTreeview = new TreeviewItem({
//         text: dataItem.text,
//         value: dataItem.value,
//         children: dataItem.children,
//         checked: dataItem.checked,
//         collapsed: true
//       });
//       arr.push(dataTreeview);
//     }
//   }
//   return arr;
// }
//
// export function formatTree(data, parentId, key) {
//   const arr = [];
//   let position = 1;
//   for (let i = 0; i < data.length; i++) {
//     const dataItem = {
//       text: (data[i])[key],
//       value: data[i],
//       parentId: data[i].parentId,
//       children: [],
//       checked: false
//     };
//     if (dataItem.value.id && dataItem.parentId === parentId) {
//       const children = formatTree(data, dataItem.value.id, key);
//       if (children.length > 0) {
//         dataItem.children = children;
//       } else {
//         dataItem.children = [];
//       }
//       dataItem.value.idx = position++;
//       dataItem.value.isBottom = dataItem.value.idx === data.filter(d => d.parentId === parentId).length;
//       if (data[i - 1] && data[i - 1].isDefault) {
//         dataItem.value.isAfterDefault = true
//       } else dataItem.value.isAfterDefault = false
//       const dataTreeview = {
//         text: dataItem.text,
//         value: dataItem.value,
//         children: dataItem.children,
//         checked: dataItem.checked,
//         collapsed: false
//       };
//       arr.push(dataTreeview);
//     }
//   }
//   return arr;
// }
//
// export function preDataTreeSave(data, type) {
//   for (let i = 0; i < data.length; i++) {
//     if (data[i]) {
//       if (isNaN(data[i].value.id)) {
//         data[i].value.id = null;
//       }
//       if (isNaN(data[i].value.parentId)) {
//         data[i].value.parentId = null;
//       }
//       if (data[i].value.percentType) {
//         data[i].value.percentType = data[i].value.percentType ? 1 : 0
//       }
//       if (data[i].value.isSumary) {
//         data[i].value.isSumary = data[i].value.isSumary ? 1 : 0
//       }
//       if (data[i].value.isFooter) {
//         data[i].value.isFooter = data[i].value.isFooter ? 1 : 0
//       }
//       if (data[i].value.rowPriority) {
//         data[i].value.rowPriority = data[i].value.rowPriority ? 1 : 0
//       }
//       if (data[i].value.formulas) {
//         if (type === 'column') {
//           const value = getFormulaColumn(data[i]);
//           delete data[i].value.formulas;
//           data[i].value.formula = value;
//         } else if (type === 'row') {
//           const value = getFormulaRow(data[i]);
//           delete data[i].value.formulas;
//           data[i].value.formula = value;
//         }
//       }
//       if (data[i].children) {
//         const child = data[i].children;
//         preDataTreeSave(child, type)
//       }
//     }
//   }
//   return data;
// }
//
// export function getFormulaColumn(item) {
//   if (item.value.formulas)
//   return item.value.formulas.map(e => {
//     if (e.isCustom) {
//       if (e.columnCode === '=') {
//         return '=='
//       } else return e.columnCode
//     } else return '{' + e.columnCode + '}'
//   }).join(' ')
//   return null
// }
//
// export function getFormulaRow(item) {
//   if (item.value.formulas)
//     return item.value.formulas.map(e => {
//     if (e.isCustom) {
//       if (e.rowCode === '=') {
//         return '=='
//       } else return e.rowCode
//     } else return '{' + e.rowCode + '}'
//   }).join(' ')
//   return null
// }
//
// export function convertArray(data, array) {
//   const arr: any = []
//   for (let i = 0; i < data.length; i++) {
//     data[i].value.children = data[i].children
//     arr.push(data[i].value)
//     if (data[i].children) {
//       const a = convertArray(data[i].children, array)
//       a.flat()
//       if (a.length > 0)
//         arr.push(a)
//     }
//   }
//   return arr.flat();
// }
//
// export function getTimeName(prdId, timeType) {
//   timeType = timeType + '';
//   switch (timeType) {
//     case '2':
//       return `Tháng ${moment(prdId, 'YYYYMMDD').format('MM/YYYY')}`;
//     case '3':
//       return `Quý ${moment(prdId, 'YYYYMMDD').format('Q/YYYY')}`;
//     case '4':
//       return `Năm ${moment(prdId, 'YYYYMMDD').format('YYYY')}`;
//     default:
//       return `Ngày ${moment(prdId, 'YYYYMMDD').format('DD/MM/YYYY')}`;
//   }
// }
//
// export function getPrdIdForHeroPicker(prdId, timeType, date = false) {
//   switch (timeType) {
//     case '2':
//       if (date) return moment(prdId, 'YYYYMMDD').toDate();
//       return moment(prdId, 'YYYYMMDD').format('MMYYYY');
//     case '3':
//       if (date) return moment(prdId, 'YYYYMMDD').toDate();
//       return moment(prdId, 'YYYYMMDD').format("QYYYY");
//     case '4':
//       if (date) return moment(prdId, 'YYYYMMDD').toDate();
//       return prdId;
//     default:
//       if (date) return moment(prdId, 'YYYYMMDD').toDate();
//       return moment(prdId, 'YYYYMMDD').format('DDMMYYYY');
//   }
// }
//
// export function getPrdIdStr(date, timeType) {
//   if (!date || !timeType) return null;
//   let momentDate = moment(date);
//   switch (timeType) {
//     case '2':
//       if (!moment.isDate(date))
//         momentDate = moment(date, 'MMYYYY');
//       return momentDate.startOf('month').format('YYYYMMDD');
//     case '3':
//       if (!moment.isDate(date))
//         momentDate = moment(date, 'QYYYY');
//       return momentDate.startOf('quarter').format('YYYYMMDD');
//     case '4':
//       if (!moment.isDate(date))
//         momentDate = moment(date, 'YYYY');
//       return momentDate.startOf('year').format('YYYYMMDD');
//     default:
//       if (!moment.isDate(date))
//         momentDate = moment(date, 'DDMMYYYY');
//       return momentDate.startOf('date').format('YYYYMMDD');
//   }
// }
//
// export function prdIdToText(prdId, timeType) {
//   let momentPrd;
//   if (moment.isDate(prdId)) {
//     momentPrd = moment(prdId);
//   } else {
//     momentPrd = moment(prdId, 'YYYYMMDD');
//   }
//   if (!momentPrd.isValid()) return null;
//   const timeTypeStr = timeType ? timeType + '' : undefined;
//   switch (timeTypeStr) {
//     case '1':
//       return 'Ngày ' + momentPrd.format('DD/MM/YYYY');
//     case '2':
//       return 'Tháng ' + momentPrd.format('MM/YYYY');
//     case '3':
//       return 'Quý ' + momentPrd.format('Q/YYYY');
//     case '4':
//       return 'Năm ' + momentPrd.format('YYYY');
//   }
//   return null;
// }
