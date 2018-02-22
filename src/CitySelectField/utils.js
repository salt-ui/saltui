import cloneDeep from 'lodash/cloneDeep';

export function find(ds, value) {
  let item = null;
  ds.some((i) => {
    if (i.value === value) {
      item = i;
      return true;
    }
  });
  return item;
}

export function joinArray(arr) {
  return Array.prototype.concat.apply([], arr.filter(t => !!t));
}

export function findTree(data, target) {
  if (!data || !data.length) {
    return null;
  } else {
    let result = find(data, target);
    if (!result) {
      if (data.some(child => {
        result = findTree(child.children, target);
        if (result) {
          result = [child].concat(result);
        }
        return !!result;
      })) {
        return result;
      }
    } else {
      return [result];
    }
  }
}

/**
 * 删除省节点下所有的子节点
 *
 * @param {any} [data=[]]
 * @returns
 */
function removeChildren(data = []) {
  const ds = cloneDeep(data);
  ds.forEach((item) => {
    if (item.children) delete item.children;
  });
  return ds;
}

/**
 * 删除市节点下所有的子节点
 *
 * @param {any} [data=[]]
 * @returns
 */
function removeChildrenL2(data = []) {
  const ds = cloneDeep(data);
  ds.forEach((item) => {
    if (item.children) {
      item.children.forEach((subItem) => {
        if (subItem.children) {
          delete subItem.children;
        }
      });
    }
  });
  return ds;
}

export function clearChildren(data, type) {
  if (type === 'province') return removeChildren(data);
  if (type === 'city') return removeChildrenL2(data);
  return data;
}
