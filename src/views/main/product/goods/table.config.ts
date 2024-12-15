import { IProp } from "@/components/v-table/index";
import { IContentConfig } from "@/components/page-content";

const propList: IProp[] = [
  {
    prop: "title",
    minWidth: "100",
    label: "商品名称",
    otherAttr: {
      showOverflowTooltip: true
    }
  },
  {
    prop: "description",
    minWidth: "120",
    label: "商品描述",
    otherAttr: {
      showOverflowTooltip: true
    }
  },
  {
    prop: "img_url",
    minWidth: "120",
    label: "商品图片",
    slotName: "imgUrl"
  },
  {
    prop: "price",
    minWidth: "80",
    label: "价格",
    slotName: "price"
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
  title: "商品列表"
};

export const contentConfig: IContentConfig = {
  pageName: "goods",
  propList,
  tableProps,
  otherComponentProps
};
