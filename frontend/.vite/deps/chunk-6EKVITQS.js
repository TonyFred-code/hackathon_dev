import {
  useTheme_default
} from "./chunk-MXMQYR75.js";
import {
  defaultTheme_default,
  identifier_default,
  init_defaultTheme,
  init_identifier
} from "./chunk-4O6DYY6X.js";
import {
  require_react
} from "./chunk-6IO4YBET.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// ../node_modules/@mui/material/styles/useTheme.js
var React = __toESM(require_react());
init_defaultTheme();
init_identifier();
function useTheme() {
  const theme = useTheme_default(defaultTheme_default);
  if (true) {
    React.useDebugValue(theme);
  }
  return theme[identifier_default] || theme;
}

export {
  useTheme
};
//# sourceMappingURL=chunk-6EKVITQS.js.map
