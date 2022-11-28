"use strict";

require("core-js/modules/es.object.assign.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModal = exports.ModalProvider = void 0;
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _Modal = _interopRequireDefault(require("./components/Modal"));
const _excluded = ["DefaultModalComponent"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const ModalContext = /*#__PURE__*/(0, _react.createContext)(undefined);
const ModalProvider = _ref => {
  let {
      DefaultModalComponent = _Modal.default
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const [modal, setModal] = (0, _react.useState)();
  const [ContainerComponent, setContainerComponent] = (0, _react.useState)(() => DefaultModalComponent);
  const [isOpening, setIsOpening] = (0, _react.useState)(false);
  const [isClosing, setIsClosing] = (0, _react.useState)(false);
  const unsetModal = (0, _react.useCallback)(() => {
    setModal(undefined);
  }, [setModal]);
  const openModal = () => {
    setIsOpening(true);
  };
  const closeModal = () => {
    setIsClosing(true);
  };
  console.log(ContainerComponent);
  return /*#__PURE__*/_react.default.createElement(ModalContext.Provider, _extends({
    value: {
      setModal,
      openModal,
      closeModal,
      setContainerComponent
    }
  }, props), props.children, ContainerComponent && modal && RenderModal(ContainerComponent, modal, unsetModal, isOpening, isClosing, setIsOpening, setIsClosing));
};
exports.ModalProvider = ModalProvider;
const RenderModal = (Container, modal, unsetModal, isOpening, isClosing, setIsOpening, setIsClosing) => {
  console.log(Container, modal);
  return /*#__PURE__*/_react.default.createElement(Container, {
    modal: modal,
    unsetModal: unsetModal,
    isOpening: isOpening,
    isClosing: isClosing,
    setIsOpening: setIsOpening,
    setIsClosing: setIsClosing
  });
};
const useModal = function useModal(ModalComponent) {
  let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let ContainerComponent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  const context = (0, _react.useContext)(ModalContext);
  if (context === undefined) throw new Error("useModal must be used within a ModalProvider");
  const {
    setModal,
    openModal,
    closeModal,
    setContainerComponent
  } = context;
  const show = (0, _react.useCallback)(() => {
    setContainerComponent(() => ContainerComponent);
    setModal( /*#__PURE__*/_react.default.createElement(ModalComponent, props));
    openModal();
  }, [setModal, openModal, ContainerComponent]);
  const close = (0, _react.useCallback)(() => {
    closeModal();
  }, [closeModal]);
  return [show, close];
};
exports.useModal = useModal;