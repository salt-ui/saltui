'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = find;
exports.findDistrictObjs = findDistrictObjs;
exports.findCityList = findCityList;
exports.clearChildren = clearChildren;

var _cloneDeep = require('lodash/cloneDeep');

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function find(ds, value) {
  var item = null;
  ds.forEach(function (i) {
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
function findDistrictObjs() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var values = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var dataset = [];
  var result = null;
  return values.map(function (value, key) {
    if (key >= 1) {
      result = find(dataset, value);
    } else {
      result = find(data, value);
    }
    dataset = result && result.children || [];
    return result;
  }).filter(function (i) {
    return !!i;
  });
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
function findCityList() {
  var dataset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var depth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  // 渲染整个省列表
  if (depth <= 0) {
    return (0, _cloneDeep2.default)(dataset);
  }
  var province = find(dataset, value[0]);
  var cityList = province.children;
  // 渲染整个市列表
  if (depth === 1) {
    return (0, _cloneDeep2.default)(cityList) || [];
  }
  // 渲染区县列表
  var city = find(cityList, value[1]);
  return (0, _cloneDeep2.default)(city.children) || [];
}

/**
 * 删除省节点下所有的子节点
 *
 * @param {any} [data=[]]
 * @returns
 */
function removeChildren() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var ds = (0, _cloneDeep2.default)(data);
  ds.forEach(function (item) {
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
function removeChildrenL2() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var ds = (0, _cloneDeep2.default)(data);
  ds.forEach(function (item) {
    if (item.children) {
      item.children.forEach(function (subItem) {
        if (subItem.children) {
          delete subItem.children;
        }
      });
    }
  });
  return ds;
}

function clearChildren(data, type) {
  if (type === 'province') return removeChildren(data);
  if (type === 'city') return removeChildrenL2(data);
  return data;
}