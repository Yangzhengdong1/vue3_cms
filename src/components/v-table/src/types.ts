export interface IPageInfo {
  currentPage: number;
  pageSize: number;
}

export interface IProp {
  prop: string;
  label?: string;
  minWidth?: string;
  slotName?: string;
  otherAttr?: object;
}
export interface IComponentProps {
  tableData: any[];
  dataCount: number;
  propList: IProp[];
  selectionColum?: boolean;
  indexColum?: boolean;
  expandColum?: boolean;
  isFooter?: boolean;
  title?: string;
  refreshBtn?: boolean;
  page: IPageInfo;
  tableProps?: any;
}
