import assign from 'object-assign';

export const isArray = arr => Object.prototype.toString.call(arr) === '[object Array]';

export const toArray = (value) => {
  let ret = value;
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
export const getParentPos = (pos, callback) => {
  pos.split('-').reduce((pre, cur) => {
    const index = `${pre}-${cur}`;
    if (typeof callback === 'function') {
      callback(index);
    }

    return index;
  });
};

export const loopChildren = (children, level = 0, callback) =>
  children.map((node, index) => {
    const { props } = node;
    const bak = assign({}, props);
    bak.key = node.key;
    const pos = `${level}-${index}`;
    delete bak.children;
    if (typeof callback === 'function') {
      callback(bak, pos);
    }
    if (props.children) {
      bak.children = loopChildren(props.children, pos, callback);
    }
    return bak;
  });
