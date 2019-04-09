'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var _objectWithoutProperties = _interopDefault(require('@babel/runtime/helpers/objectWithoutProperties'));
var _classCallCheck = _interopDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass = _interopDefault(require('@babel/runtime/helpers/createClass'));
var _possibleConstructorReturn = _interopDefault(require('@babel/runtime/helpers/possibleConstructorReturn'));
var _getPrototypeOf = _interopDefault(require('@babel/runtime/helpers/getPrototypeOf'));
var _inherits = _interopDefault(require('@babel/runtime/helpers/inherits'));
var React = _interopDefault(require('react'));
var router = require('@reach/router');
var PropTypes = _interopDefault(require('prop-types'));

var AmbiLink =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AmbiLink, _React$Component);

  function AmbiLink() {
    _classCallCheck(this, AmbiLink);

    return _possibleConstructorReturn(this, _getPrototypeOf(AmbiLink).apply(this, arguments));
  }

  _createClass(AmbiLink, [{
    key: "isInternal",
    value: function isInternal(to) {
      if (typeof to !== "string") return true;
      return !to.match(/^#/) && !to.match(/^[a-z]{1,10}:\/\//) && !to.match(/^mailto:|^tel:/);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          _this$props$to = _this$props.to,
          to = _this$props$to === void 0 ? "" : _this$props$to,
          children = _this$props.children,
          rest = _objectWithoutProperties(_this$props, ["to", "children"]);

      var isInternal = this.isInternal(to);

      if (isInternal) {
        return React.createElement(router.Link, _extends({
          to: to
        }, rest), children);
      }

      return React.createElement("a", _extends({
        href: to
      }, rest), children);
    }
  }]);

  return AmbiLink;
}(React.Component);

var defaultFill = "#565656";

var DribbbleIcon = function DribbbleIcon() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 23 23"
  }), React.createElement("g", null, React.createElement("path", {
    className: "fillPath",
    fill: defaultFill,
    fillRule: "evenodd",
    d: "M16.62 19.718c-.099-.58-.61-3.4-1.871-6.861 3.102-.497 5.789.354 5.987.419a9.61 9.61 0 0 1-4.117 6.442zm-5.37 1.64a9.57 9.57 0 0 1-6.12-2.202c.126.103.215.168.215.168s1.841-4.016 7.54-6.002c.02-.008.043-.013.064-.02 1.352 3.512 1.91 6.454 2.052 7.294a9.576 9.576 0 0 1-3.75.762zM1.643 11.75c0-.102.005-.202.008-.303.17.004 4.917.112 9.864-1.369.275.539.538 1.088.78 1.634a6.536 6.536 0 0 0-.38.115C6.73 13.501 4.1 18.166 4.1 18.166l.004.004a9.57 9.57 0 0 1-2.462-6.42zM7.15 3.062c.128.171 1.905 2.58 3.568 5.535C6.106 9.823 2.1 9.774 1.849 9.77A9.61 9.61 0 0 1 7.15 3.062zm1.798-.64l-.002.003-.029.005c.01-.003.02-.004.03-.008zm8.647 2.12c-.024.035-1.392 2.118-5.02 3.477a48.815 48.815 0 0 0-3.59-5.605 9.609 9.609 0 0 1 2.265-.271 9.57 9.57 0 0 1 6.345 2.398zm3.26 7.112c-.14-.03-3.391-.73-6.692-.315-.069-.164-.136-.33-.208-.494-.2-.471-.415-.937-.639-1.395 3.794-1.549 5.334-3.775 5.353-3.802a9.57 9.57 0 0 1 2.186 6.006zm1.416-2.168a11.29 11.29 0 0 0-.657-2.115 11.243 11.243 0 0 0-4.075-4.947c-.6-.408-1.243-.756-1.91-1.039A11.272 11.272 0 0 0 8.984.73c-.722.147-1.434.37-2.114.655A11.278 11.278 0 0 0 .228 9.486a11.353 11.353 0 0 0 0 4.53c.148.723.369 1.435.657 2.113.28.667.631 1.312 1.037 1.913.402.595.864 1.154 1.372 1.664a11.272 11.272 0 0 0 3.576 2.409c.68.288 1.392.508 2.114.655.741.153 1.503.23 2.267.23.762 0 1.524-.077 2.265-.23a11.21 11.21 0 0 0 4.025-1.692 11.423 11.423 0 0 0 1.665-1.372c.508-.51.97-1.069 1.372-1.664a11.234 11.234 0 0 0 1.695-4.025 11.383 11.383 0 0 0 0-4.531z"
  })));
};

var FacebookIcon = function FacebookIcon() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 24 24"
  }), React.createElement("g", null, React.createElement("path", {
    className: "fillPath",
    fill: defaultFill,
    fillRule: "evenodd",
    d: "M12.82 24H1.324A1.325 1.325 0 0 1 0 22.675V1.325C0 .593.593 0 1.325 0h21.35C23.407 0 24 .593 24 1.325v21.35c0 .732-.593 1.325-1.325 1.325H16.56v-9.294h3.12l.466-3.622H16.56V8.77c0-1.048.29-1.763 1.795-1.763h1.918v-3.24c-.332-.045-1.47-.143-2.795-.143-2.766 0-4.659 1.688-4.659 4.788v2.67H9.692v3.623h3.127V24z"
  })));
};

var GitHubIcon = function GitHubIcon() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 25 24"
  }), React.createElement("g", null, React.createElement("path", {
    className: "fillPath",
    fill: defaultFill,
    fillRule: "evenodd",
    d: "M12.5 0C5.872 0 .5 5.508.5 12.305c0 5.435 3.438 10.047 8.207 11.674.6.113.82-.267.82-.593 0-.292-.011-1.066-.017-2.093-3.338.744-4.043-1.65-4.043-1.65-.545-1.42-1.332-1.798-1.332-1.798-1.09-.764.083-.749.083-.749 1.204.087 1.837 1.268 1.837 1.268 1.071 1.88 2.809 1.338 3.493 1.022.109-.795.42-1.337.762-1.645-2.665-.31-5.466-1.365-5.466-6.08 0-1.343.467-2.442 1.235-3.302-.123-.311-.535-1.562.117-3.256 0 0 1.008-.33 3.3 1.261.958-.273 1.984-.409 3.005-.414 1.019.005 2.046.141 3.004.414 2.29-1.592 3.297-1.261 3.297-1.261.654 1.694.242 2.945.119 3.256.77.86 1.234 1.959 1.234 3.302 0 4.726-2.806 5.767-5.48 6.071.431.38.815 1.13.815 2.279 0 1.645-.015 2.971-.015 3.375 0 .329.216.712.825.591 4.765-1.63 8.2-6.239 8.2-11.672C24.5 5.508 19.127 0 12.5 0"
  })));
};

var InstagramIcon = function InstagramIcon() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 24 24"
  }), React.createElement("g", null, React.createElement("path", {
    className: "fillPath",
    fill: defaultFill,
    fillRule: "evenodd",
    d: "M12 0c3.259 0 3.668.014 4.948.072 1.277.058 2.15.261 2.912.558.79.307 1.459.717 2.126 1.384A5.883 5.883 0 0 1 23.37 4.14c.297.763.5 1.635.558 2.912C23.986 8.332 24 8.741 24 12c0 3.259-.014 3.668-.072 4.948-.058 1.277-.261 2.15-.558 2.912a5.883 5.883 0 0 1-1.384 2.126 5.883 5.883 0 0 1-2.126 1.384c-.763.297-1.635.5-2.912.558-1.28.058-1.689.072-4.948.072-3.259 0-3.668-.014-4.948-.072-1.277-.058-2.15-.261-2.912-.558a5.883 5.883 0 0 1-2.126-1.384A5.882 5.882 0 0 1 .63 19.86c-.297-.763-.5-1.635-.558-2.912C.014 15.668 0 15.259 0 12c0-3.259.014-3.668.072-4.948C.13 5.775.333 4.902.63 4.14a5.882 5.882 0 0 1 1.384-2.126A5.882 5.882 0 0 1 4.14.63C4.903.333 5.775.13 7.052.072 8.332.014 8.741 0 12 0zm0 2.162c-3.204 0-3.584.012-4.849.07-1.17.053-1.805.249-2.228.413-.56.218-.96.478-1.38.898-.42.42-.68.82-.898 1.38-.164.423-.36 1.058-.413 2.228-.058 1.265-.07 1.645-.07 4.849s.012 3.584.07 4.849c.053 1.17.249 1.805.413 2.228.218.56.478.96.898 1.38.42.42.82.68 1.38.898.423.164 1.058.36 2.228.413 1.265.058 1.645.07 4.849.07s3.584-.012 4.849-.07c1.17-.053 1.805-.249 2.228-.413.56-.218.96-.478 1.38-.898.42-.42.68-.82.898-1.38.164-.423.36-1.058.413-2.228.058-1.265.07-1.645.07-4.849s-.012-3.584-.07-4.849c-.053-1.17-.249-1.805-.413-2.228a3.717 3.717 0 0 0-.898-1.38c-.42-.42-.82-.68-1.38-.898-.423-.164-1.058-.36-2.228-.413-1.265-.058-1.645-.07-4.849-.07zm0 3.676a6.162 6.162 0 1 1 0 12.324 6.162 6.162 0 0 1 0-12.324zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm7.846-10.406a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"
  })));
};

var LinkedInIcon = function LinkedInIcon() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 24 24"
  }), React.createElement("g", null, React.createElement("path", {
    className: "fillPath",
    fill: defaultFill,
    d: "m7.70940171 7.395708h4.32478629v2.0336135h.1880342c.5585215-1.1919014 2.0538879-2.4033614 4.3247863-2.4033614 4.596371 0 5.4529915 3.0253188 5.4529915 7.0252101v7.9495798h-4.5128205v-7.0252101c-.0649776-1.7749187-.0985958-3.9541858-2.4444445-3.8823529-2.3877377-.0718329-2.7515296 1.7740595-2.8205128 3.6974789v7.2100841h-4.51282049z"
  }), React.createElement("path", {
    className: "fillPath",
    fill: defaultFill,
    d: "m2.63247863 5.17659558c1.45223335 0 2.63247864-1.15990949 2.63247864-2.58823529 0-1.42832579-1.18024529-2.58823529-2.63247864-2.58823529-1.45563585 0-2.63247863 1.1599095-2.63247863 2.58823529 0 1.4283258 1.17684278 2.58823529 2.63247863 2.58823529z"
  }), React.createElement("path", {
    className: "fillPath",
    fill: defaultFill,
    d: "m.188 22h4.701v-14.605h-4.701z"
  })));
};

var TwitterIcon = function TwitterIcon() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 24 20"
  }), React.createElement("g", null, React.createElement("path", {
    className: "fillPath",
    fill: defaultFill,
    fillRule: "evenodd",
    d: "M21.173 3.083A4.932 4.932 0 0 0 23.338.361a9.846 9.846 0 0 1-3.129 1.193A4.912 4.912 0 0 0 16.616 0a4.923 4.923 0 0 0-4.796 6.044A13.975 13.975 0 0 1 1.67.899a4.915 4.915 0 0 0-.666 2.477c0 1.707.87 3.214 2.19 4.097a4.928 4.928 0 0 1-2.23-.614v.06a4.924 4.924 0 0 0 3.95 4.827 4.808 4.808 0 0 1-1.296.174c-.317 0-.627-.03-.927-.088A4.925 4.925 0 0 0 7.29 15.25a9.878 9.878 0 0 1-6.115 2.109c-.397 0-.79-.023-1.175-.068a13.961 13.961 0 0 0 7.548 2.21c9.058 0 14.01-7.5 14.01-14.006 0-.214-.005-.428-.013-.638A9.96 9.96 0 0 0 24 2.308a9.808 9.808 0 0 1-2.827.775z"
  })));
};

var UpCityIcon = function UpCityIcon() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return React.createElement("svg", _extends({}, props, {
    viewBox: "0 0 24 24"
  }), React.createElement("g", null, React.createElement("path", {
    className: "fillPath",
    fill: defaultFill,
    fillRule: "evenodd",
    d: "m11.5855279.0002712c4.8108014.03401014 8.6016768 3.24023832 9.3225175 7.75933499.3224706 2.01935176-.2461607 3.84739651-1.036747 5.63756631-1.6734828 3.7816952-4.2187848 7.0285036-7.150149 10.0198495-.6941732.7080292-1.4404505.7876438-2.1013921.1480214-3.66574368-3.5474889-6.8030623-7.4428088-8.25048745-12.2915719-1.73009973-5.79756857 2.83331011-11.31803184 9.21625805-11.2732003zm-.1493375 15.0460064c3.6066651.0096619 6.55444-2.6937573 6.6241855-6.07544683.0676942-3.28506985-2.9042865-6.14076175-6.4092051-6.15660738-3.74328432-.01661859-6.68777703 2.63539898-6.72429087 6.05380401-.03528304 3.3519307 2.93218467 6.1685882 6.50931047 6.1782502zm.1530299-8.91683901c1.672252.01777803 2.9826477 1.26610456 2.9707499 2.83057077-.0127183 1.62321094-1.353884 2.83675444-3.1028561 2.80892794-1.65337966-.026667-3.02449498-1.3229169-2.99495569-2.83288963.02789822-1.60736535 1.38547469-2.82477359 3.12706189-2.80660908z"
  })));
};

var Icon = function Icon(_ref) {
  var name = _ref.name,
      restProps = _objectWithoutProperties(_ref, ["name"]);

  var pickIcon = function pickIcon(name) {
    var filteredName = name.toLowerCase();

    switch (filteredName) {
      case "dribbble":
        return DribbbleIcon;

      case "facebook":
        return FacebookIcon;

      case "github":
        return GitHubIcon;

      case "instagram":
        return InstagramIcon;

      case "linkedin":
        return LinkedInIcon;

      case "twitter":
        return TwitterIcon;

      case "upcity":
        return UpCityIcon;

      default:
        throw new Error("no SVG for: ".concat(name));
    }
  };

  var Icon = pickIcon(name);
  return React.createElement(Icon, restProps);
};

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

var ReactMarkdownLink = function ReactMarkdownLink(props) {
  return React.createElement(AmbiLink, {
    to: props.href
  }, props.children);
};

exports.AmbiLink = AmbiLink;
exports.Icon = Icon;
exports.ReactMarkdownLink = ReactMarkdownLink;
