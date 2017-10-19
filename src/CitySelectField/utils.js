import cloneDeep from 'lodash/cloneDeep'

export function find(ds, value) {
  let item = null;
  ds.forEach((i) => {
    if (i.value === value) item = i;
  });
  return item;
}

/**
 * 根据值返回对应的城市对象（包括 label 和 id 两个属性）
 *
 * @export
 * @param {any} [data=[]]
 * @param {any} [values=[]]
 * @returns
 */
export function findDistrictObjs(data = [], values = []) {
  let dataset = [];
  let result = null;
  return values.map((value, key) => {
    if (key >= 1) {
      result = find(dataset, value);
    } else {
      result = find(data, value);
    }
    dataset = (result && result.children) || [];
    return result;
  }).filter(i => !!i);
}

/**
 * 根据地区值找到对应的地区，并返回该地区的所有子节点
 *
 * @export
 * @param {any} [dataset=[]]
 * @param {any} [value=[]] 想要查询子节点的节点的值
 * @param {number} [depth=0]
 *  0 province
 *  1 city
 *  2 district
 * @returns
 */
export function findCityList(dataset = [], value = [], depth = 0) {
  // 渲染整个省列表
  if (depth <= 0) {
    return cloneDeep(dataset);
  }
  const province = find(dataset, value[0]);
  const cityList = province.children;
  // 渲染整个市列表
  if (depth === 1) {
    return cloneDeep(cityList) || [];
  }
  // 渲染区县列表
  const city = find(cityList, value[1]);
  return cloneDeep(city.children) || [];
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
