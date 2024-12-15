import { IProp } from "@/components/v-table/index";
import { IContentConfig } from "@/components/page-content";

const propList: IProp[] = [
  {
    prop: "name",
    minWidth: "100",
    label: "角色名称",
    otherAttr: {
      showOverflowTooltip: true
    }
  },
  {
    prop: "description",
    minWidth: "120",
    label: "角色描述",
    otherAttr: {
      showOverflowTooltip: true
    }
  },
  {
    prop: "departmentName",
    minWidth: "120",
    label: "所属部门"
  },
  {
    prop: "level",
    minWidth: "120",
    label: "等级",
    slotName: "level"
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
  height: "420px"
};

const otherComponentProps = {
  selectionColum: true,
  indexColum: true,
  title: "角色列表"
};

export const levelNameMap: any = {
  "Super Administrator": "超级管理员",
  Administrator: "管理员",
  "Advanced User": "高级用户",
  "Regular User": "普通用户",
  Guest: "游客"
};

export const contentConfig: IContentConfig = {
  pageName: "role",
  propList,
  tableProps,
  otherComponentProps
};
