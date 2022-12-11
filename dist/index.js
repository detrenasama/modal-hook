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
  const [modals, setModals] = (0, _react.useState)([]);
  const [closingModal, setClosingModal] = (0, _react.useState)(null);
  const [openingModal, setOpeningModal] = (0, _react.useState)(null);
  const addModal = (0, _react.useCallback)((modal, Container) => {
    setModals(modals => {
      const found = modals.find(e => e.modal.type === modal.type);
      if (found) return modals;
      return [...modals, {
        key: "modal_" + new Date().getTime(),
        modal,
        Container
      }];
    });
    setOpeningModal(modal);
  }, []);
  const unsetModal = key => {
    setModals(modals => {
      const index = modals.findIndex(e => e.key === key);
      if (index >= 0) {
        const newModals = [...modals];
        newModals.splice(index, 1);
        return newModals;
      }
      return [...modals];
    });
  };
  const closeModal = modal => {
    setClosingModal(modal);
  };
  return /*#__PURE__*/_react.default.createElement(ModalContext.Provider, _extends({
    value: {
      addModal,
      closeModal
    }
  }, props), props.children, modals.map(_ref2 => {
    let {
      key,
      modal,
      Container
    } = _ref2;
    const ContainerComponent = Container ? Container : DefaultModalComponent;
    return /*#__PURE__*/_react.default.createElement(ContainerComponent, {
      key: key,
      modal: modal,
      isOpening: modal === openingModal,
      stopOpening: () => setOpeningModal(null),
      isClosing: modal === closingModal,
      closeModal: () => setClosingModal(modal),
      stopClosing: () => {
        setClosingModal(null);
        unsetModal(key);
      }
    });
  }));
};
exports.ModalProvider = ModalProvider;
const useModal = function useModal(ModalComponent) {
  let props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let ContainerComponent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  const context = (0, _react.useContext)(ModalContext);
  if (context === undefined) throw new Error("useModal must be used within a ModalProvider");
  const {
    addModal,
    closeModal
  } = context;
  const modal = /*#__PURE__*/_react.default.createElement(ModalComponent, props);
  const show = (0, _react.useCallback)(() => {
    addModal(modal, ContainerComponent);
  }, [addModal, ModalComponent, ContainerComponent]);
  const close = (0, _react.useCallback)(() => {
    closeModal(modal);
  }, [closeModal, modal]);
  return [show, close];
};
exports.useModal = useModal;