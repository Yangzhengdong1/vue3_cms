import { IProp } from "@/components/v-table/index";
import { IContentConfig } from "@/components/page-content";

const propList: IProp[] = [
  {
    prop: "name",
    minWidth: "120",
    label: "权限名称",
    otherAttr: {
      showOverflowTooltip: true
    }
  },
  {
    prop: "description",
    minWidth: "120",
    label: "权限描述",
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
  maxHeight: "500px"
};

const otherComponentProps = {
  indexColum: true,
  // selectionColum: true,
  title: "权限列表"
};

export const contentConfig: IContentConfig = {
  pageName: "permission",
  propList,
  tableProps,
  otherComponentProps
};
