import { IProp } from "@/components/v-table/index";
import { IContentConfig, IRoleLeevelMap } from "@/components/page-content";

const propList: IProp[] = [
  {
    prop: "username",
    minWidth: "100",
    label: "用户名",
    slotName: "username",
    otherAttr: {
      showOverflowTooltip: true
    }
  },
  {
    prop: "roleName",
    minWidth: "120",
    label: "角色",
    slotName: "roleName"
  },
  {
    prop: "realname",
    minWidth: "100",
    label: "真实姓名",
    otherAttr: {
      showOverflowTooltip: true
    }
  },
  {
    prop: "phone",
    minWidth: "120",
    label: "手机号"
  },
  {
    prop: "isActive",
    minWidth: "120",
    label: "是否启用",
    slotName: "isActive"
  },
  {
    prop: "departmentName",
    minWidth: "120",
    label: "所属部门"
  },
  {
    prop: "createTime",
    minWidth: "175",
    label: "创建时间"
  },
  {
    prop: "handler",
    minWidth: "120",
    slotName: "handler"
  }
];

const childrenProps = {
  selectionColum: true,
  indexColum: true,
  title: "用户列表"
};

export const roleLevelMap: IRoleLeevelMap = {
  "Super Administrator": "danger",
  Administrator: "warning",
  "Advanced User": "primary",
  "Regular User": "success",
  Guest: "info"
};

export const contentConfig: IContentConfig = {
  pageName: "user",
  propList,
  childrenProps
};
