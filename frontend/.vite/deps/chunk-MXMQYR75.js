import {
  createTheme_default,
  init_createTheme,
  init_resolveProps,
  init_styled_engine,
  resolveProps
} from "./chunk-4O6DYY6X.js";
import {
  ThemeContext,
  require_react
} from "./chunk-6IO4YBET.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// ../node_modules/@mui/system/esm/useThemeWithoutDefault.js
var React = __toESM(require_react());
init_styled_engine();
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme(defaultTheme = null) {
  const contextTheme = React.useContext(ThemeContext);
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme : contextTheme;
}
var useThemeWithoutDefault_default = useTheme;

// ../node_modules/@mui/system/esm/useTheme.js
init_createTheme();
var systemDefaultTheme = createTheme_default();
function useTheme2(defaultTheme = systemDefaultTheme) {
  return useThemeWithoutDefault_default(defaultTheme);
}
var useTheme_default = useTheme2;

// ../node_modules/@mui/system/esm/useThemeProps/getThemeProps.js
init_resolveProps();
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  return resolveProps(theme.components[name].defaultProps, props);
}

// ../node_modules/@mui/system/esm/useThemeProps/useThemeProps.js
function useThemeProps({
  props,
  name,
  defaultTheme,
  themeId
}) {
  let theme = useTheme_default(defaultTheme);
  if (themeId) {
    theme = theme[themeId] || theme;
  }
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}

export {
  useThemeWithoutDefault_default,
  useTheme_default,
  getThemeProps,
  useThemeProps
};
//# sourceMappingURL=chunk-MXMQYR75.js.map
