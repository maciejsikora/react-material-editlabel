"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactTapEventPlugin = require("react-tap-event-plugin");

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _reactMaterialEditlabel = require("react-material-editlabel");

var _reactMaterialEditlabel2 = _interopRequireDefault(_reactMaterialEditlabel);

var _MuiThemeProvider = require("material-ui/styles/MuiThemeProvider");

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _List = require("material-ui/List");

var _inbox = require("material-ui/svg-icons/content/inbox");

var _inbox2 = _interopRequireDefault(_inbox);

var _grade = require("material-ui/svg-icons/action/grade");

var _grade2 = _interopRequireDefault(_grade);

var _send = require("material-ui/svg-icons/content/send");

var _send2 = _interopRequireDefault(_send);

var _drafts = require("material-ui/svg-icons/content/drafts");

var _drafts2 = _interopRequireDefault(_drafts);

var _Divider = require("material-ui/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _info = require("material-ui/svg-icons/action/info");

var _info2 = _interopRequireDefault(_info);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
  _inherits(App, _Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
  }

  _createClass(App, [{
    key: "getEditLabel",
    value: function getEditLabel(text) {

      return _react2.default.createElement(_reactMaterialEditlabel2.default, { value: text });
    }
  }, {
    key: "render",
    value: function render() {

      return _react2.default.createElement(
        _MuiThemeProvider2.default,
        null,
        _react2.default.createElement(
          MobileTearSheet,
          null,
          _react2.default.createElement(
            _List.List,
            null,
            _react2.default.createElement(_List.ListItem, { primaryText: this.getEditLabel("You are the one"), leftIcon: _react2.default.createElement(_inbox2.default, null) }),
            _react2.default.createElement(_List.ListItem, { primaryText: this.getEditLabel("Follow the white rabbit"), leftIcon: _react2.default.createElement(_grade2.default, null) }),
            _react2.default.createElement(_List.ListItem, { primaryText: this.getEditLabel("War, war never changes"), leftIcon: _react2.default.createElement(_send2.default, null) }),
            _react2.default.createElement(_List.ListItem, { primaryText: this.getEditLabel("life is like box of chocolates"), leftIcon: _react2.default.createElement(_drafts2.default, null) }),
            _react2.default.createElement(_List.ListItem, { primaryText: this.getEditLabel("One for all, all for one"), leftIcon: _react2.default.createElement(_inbox2.default, null) })
          ),
          _react2.default.createElement(_Divider2.default, null),
          _react2.default.createElement(
            _List.List,
            null,
            _react2.default.createElement(_List.ListItem, { primaryText: "All mail", rightIcon: _react2.default.createElement(_info2.default, null) }),
            _react2.default.createElement(_List.ListItem, { primaryText: "Trash", rightIcon: _react2.default.createElement(_info2.default, null) }),
            _react2.default.createElement(_List.ListItem, { primaryText: "Spam", rightIcon: _react2.default.createElement(_info2.default, null) }),
            _react2.default.createElement(_List.ListItem, { primaryText: "Follow up", rightIcon: _react2.default.createElement(_info2.default, null) })
          )
        )
      );
    }
  }]);

  return App;
}(_react.Component);

;

_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));