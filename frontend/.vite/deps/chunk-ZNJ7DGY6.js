import {
  capitalize_default,
  init_capitalize
} from "./chunk-V2NEPLGC.js";
import {
  createContainer
} from "./chunk-RXRPSATN.js";
import {
  init_DefaultPropsProvider,
  useDefaultProps
} from "./chunk-HLYHCZXD.js";
import {
  init_styled,
  styled_default
} from "./chunk-IIZHTCWD.js";
import {
  generateUtilityClass,
  generateUtilityClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  require_prop_types
} from "./chunk-4O6DYY6X.js";
import {
  __toESM
} from "./chunk-V4OQ3NZ2.js";

// ../node_modules/@mui/material/Container/Container.js
var import_prop_types = __toESM(require_prop_types());
init_capitalize();
init_styled();
init_DefaultPropsProvider();
var Container = createContainer({
  createStyledComponent: styled_default("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (props, styles) => {
      const {
        ownerState
      } = props;
      return [styles.root, styles[`maxWidth${capitalize_default(String(ownerState.maxWidth))}`], ownerState.fixed && styles.fixed, ownerState.disableGutters && styles.disableGutters];
    }
  }),
  useThemeProps: (inProps) => useDefaultProps({
    props: inProps,
    name: "MuiContainer"
  })
});
true ? Container.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: import_prop_types.default.elementType,
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters: import_prop_types.default.bool,
  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   * @default false
   */
  fixed: import_prop_types.default.bool,
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["xs", "sm", "md", "lg", "xl", false]), import_prop_types.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Container_default = Container;

// ../node_modules/@mui/material/Container/containerClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getContainerUtilityClass(slot) {
  return generateUtilityClass("MuiContainer", slot);
}
var containerClasses = generateUtilityClasses("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
var containerClasses_default = containerClasses;

export {
  Container_default,
  getContainerUtilityClass,
  containerClasses_default
};
//# sourceMappingURL=chunk-ZNJ7DGY6.js.map