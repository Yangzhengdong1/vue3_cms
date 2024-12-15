import { IProp } from "@/components/v-table/index";
import { IContentConfig } from "@/components/page-content";

const propList: IProp[] = [
  {
    prop: "name",
    minWidth: "120",
    label: "菜单名称",
    otherAttr: {
      showOverflowTooltip: true
    }
  },
  {
    prop: "icon",
    minWidth: "120",
    label: "菜单图标",
    slotName: "icon"
  },
  {
    prop: "url",
    minWidth: "200",
    label: "菜单url"
  },
  {
    prop: "createTime",
    minWidth: "175",
    label: "创建时间"
  },
  {
    prop: "createTime",
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
  height: "420px",
  rowKey: "wid",
  treeProps: { children: "childrens" }
};

const otherComponentProps = {
  isFooter: false,
  title: "菜单列表"
};

export const contentConfig: IContentConfig = {
  pageName: "menu",
  propList,
  tableProps,
  otherComponentProps
};
