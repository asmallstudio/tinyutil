const { withSiteData, withRouteData } = require("react-static");

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 * @link https://github.com/reduxjs/redux/blob/master/src/compose.js
 * @link https://redux.js.org/api/compose
 */

const compose = (...funcs) => {
  if (funcs.length === 0) {
    return arg => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)));
};

const withSiteAndRouteData = compose(
  withSiteData,
  withRouteData
);

export { withSiteAndRouteData };
