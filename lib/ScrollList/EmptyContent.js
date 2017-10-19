"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EmptyContent = function EmptyContent(props) {
  return _react2.default.createElement(
    "div",
    { key: "empty-content", className: "empty-content" },
    _react2.default.createElement("div", { className: "icon", style: { backgroundImage: "url(" + props.image + ")" } }),
    _react2.default.createElement(
      "div",
      { className: "text" },
      props.text
    )
  );
};

EmptyContent.propTypes = {
  image: _react2.default.PropTypes.string,
  text: _react2.default.PropTypes.string
};

exports.default = EmptyContent;
module.exports = exports["default"];