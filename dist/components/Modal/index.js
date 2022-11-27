"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _stylesModule = _interopRequireDefault(require("./styles.module.css"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Modal = _ref => {
  let {
    modal,
    unsetModal,
    isOpening,
    isClosing,
    setIsOpening,
    setIsClosing
  } = _ref;
  // Opening animation
  (0, _react.useEffect)(() => {
    if (!isOpening) return;
    const timer = setTimeout(() => {
      setIsOpening(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [isOpening, setIsOpening]);

  // Closing animation
  (0, _react.useEffect)(() => {
    if (!isClosing) return;
    const timer = setTimeout(() => {
      unsetModal();
      setIsClosing(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [isClosing, setIsClosing, unsetModal]);
  const animationStyle = isOpening ? _stylesModule.default.opening : isClosing ? _stylesModule.default.closing : null;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "".concat(_stylesModule.default.container, " ").concat(animationStyle),
    role: "dialog",
    tabIndex: "-1"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.background
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.inner
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _stylesModule.default.body
  }, modal)));
};
var _default = Modal;
exports.default = _default;