'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loopChildren = exports.getParentPos = exports.toArray = exports.isArray = undefined;

var _objectAssign = require('object-assign');

var _objectAssign2 = _interopRequireDefault(_objectAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isArray = exports.isArray = function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
};

var toArray = exports.toArray = function toArray(value) {
  var ret = value;
  if (value === undefined || value === null) {
    ret = [];
  } else if (!isArray(value)) {
    ret = [value];
  }

  return ret;
};

/*
 * 通过子层的pos获取祖先的pos
 * @return Array
 */
var getParentPos = exports.getParentPos = function getParentPos(pos, callback) {
  pos.split('-').reduce(function (pre, cur) {
    var index = pre + '-' + cur;
    if (typeof callback === 'function') {
      callback(index);
    }

    return index;
  });
};

var loopChildren = exports.loopChildren = function loopChildren(children) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var callback = arguments[2];
  return children.map(function (node, index) {
    var props = node.props;
    var bak = (0, _objectAssign2.default)({}, props);
    bak.key = node.key;
    var pos = level + '-' + index;
    delete bak.children;
    if (typeof callback === 'function') {
      callback(bak, pos);
    }
    if (props.children) {
      bak.children = loopChildren(props.children, pos, callback);
    }
    return bak;
  });
};