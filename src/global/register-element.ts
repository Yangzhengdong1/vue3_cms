import type { App } from "vue";

import {
  ElButton,
  ElInput,
  ElTabs,
  ElIcon,
  ElForm,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElMenu,
  ElDropdown,
  ElAvatar,
  ElRow,
  ElCol,
  ElDatePicker,
  ElSelect,
  ElBreadcrumb
} from "element-plus";
import {
  Search,
  Loading,
  UserFilled,
  Iphone,
  Platform,
  Fold,
  Expand,
  Setting,
  ShoppingBag,
  ShoppingTrolley,
  Shop,
  SwitchButton,
  Edit
} from "@element-plus/icons-vue";

const icons = [
  Loading,
  Search,
  UserFilled,
  Iphone,
  Platform,
  Fold,
  Expand,
  Setting,
  Shop,
  ShoppingBag,
  ShoppingTrolley,
  SwitchButton,
  Edit
];
const components = [
  ElButton,
  ElInput,
  ElTabs,
  ElTabs.TabPane,
  ElIcon,
  ElForm,
  ElForm.FormItem,
  ElCheckbox,
  ElLink,
  ElContainer,
  ElContainer.Aside,
  ElContainer.Header,
  ElContainer.Main,
  ElMenu,
  ElMenu.SubMenu,
  ElMenu.MenuItemGroup,
  ElMenu.MenuItem,
  ElDropdown,
  ElDropdown.DropdownItem,
  ElDropdown.DropdownMenu,
  ElAvatar,
  ElRow,
  ElCol,
  ElDatePicker,
  ElSelect,
  ElSelect.Option,
  ElBreadcrumb,
  ElBreadcrumb.BreadcrumbItem
];
const concatComponents = [...icons, ...components];

const registerElement = (app: App) => {
  concatComponents.forEach((component) => {
    app.component(component.name as string, component);
  });
};

export default registerElement;