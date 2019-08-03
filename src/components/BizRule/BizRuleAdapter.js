import { cloneJSON } from '@jsmini/clone';

const RE_NUMBER = /^\d+(\.\d+)?$/;

export default {
  // 转化最终数据格式为自定义数据格式
  cvtOrigin2Custom(data) {
    let res = {
      type: 'all_any',
      condition: 'all',
      children: [],
    };
    if (data.all !== undefined) {
      res.condition = 'all';
      for (const child of data.all) {
        const tempChild = cloneJSON(child);
        if (tempChild.all !== undefined || tempChild.any !== undefined) {
          res.children.push(this.cvtOrigin2Custom(tempChild));
        } else {
          tempChild.type = 'condition';
          tempChild.val_type = typeof tempChild.value;
          res.children.push(tempChild);
        }
      }
    } else if (data.any !== undefined) {
      res.condition = 'any';
      for (const child of data.any) {
        const tempChild = cloneJSON(child);
        if (tempChild.all !== undefined || tempChild.any !== undefined) {
          res.children.push(this.cvtOrigin2Custom(tempChild));
        } else {
          tempChild.type = 'condition';
          tempChild.val_type = typeof tempChild.value;
          res.children.push(tempChild);
        }
      }
    }
    return res;
  },
  // 转化自定义数据格式为最终数据格式
  cvtCustom2Origin(data) {
    const res = {};
    if (data.type === 'all_any') {
      res[data.condition] = [];
      for (const child of data.children) {
        const tempChild = cloneJSON(child);
        if (tempChild.type === 'all_any') {
          res[data.condition].push(this.cvtCustom2Origin(tempChild));
        } else if (tempChild.type === 'condition') {
          if (tempChild.val_type && tempChild.val_type === 'number' && RE_NUMBER.test(String(tempChild.value))) {
            tempChild.value = Number(tempChild.value);
          } else if (tempChild.val_type && tempChild.val_type === 'string') {
            tempChild.value = String(tempChild.value);
          }
          // 删除多余字段
          delete tempChild.type;
          delete tempChild.val_type;
          res[data.condition].push(tempChild);
        }
      }
    }
    return res;
  },
};
