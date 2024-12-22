import { IProp } from "@/components/v-table/index";
import { IContentConfig } from "@/components/page-content";

interface IRoleLeevelMap {
  "Super Administrator": "danger"; // 超管
  Administrator: "warning"; // 管理员
  "Advanced User": "primary"; // 高级用户
  "Regular User": "success"; // 普通用户
  Guest: "info"; // 游客
}

const propList: IProp[] = [
  {
    prop: "name",
    minWidth: "120",
    label: "部门名称",
    otherAttr: {
      showOverflowTooltip: true
    }
  },
  {
    prop: "parentName",
    minWidth: "120",
    label: "上级部门",
    otherAttr: {
      showOverflowTooltip: true
    }
  },
  {
    prop: "createTime",
    minWidth: "175",
    label: "创建时间"
  },
  {
    prop: "updateTime",
    minWidth: "175",
    label: "更新时间"
  },
  {
    prop: "handler",
    minWidth: "145",
    slotName: "handler",
    label: "操作"
  }
];

const tableProps = {
  emptyText: "暂无数据~",
  height: "420px"
};

const otherComponentProps = {
  expandColum: true,
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
  pageName: "department",
  propList,
  tableProps,
  otherComponentProps
};
