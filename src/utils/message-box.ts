import { ElMessageBox } from "element-plus";

export enum IType {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  ERROR = "error"
}
/**
 * 封装的确认弹窗
 * @param {Object} options - 配置参数
 * @param {String} options.title - 弹窗标题
 * @param {String} options.message - 弹窗内容
 * @param {String} options.confirmText - 确认按钮文字
 * @param {String} options.cancelText - 取消按钮文字
 * @param {String} options.type - 弹窗类型 ('warning', 'info', 'success', 'error')
 * @returns {Promise} - 返回一个Promise，用户点击确认时 resolve，取消时 reject
 */
const defaultOptions = {
  title: "提示",
  message: "确定执行此操作吗？",
  confirmText: "确定",
  cancelText: "取消",
  type: "warning" as IType
};
export const confirmDialog = (options = defaultOptions) => {
  const { title, message, confirmText, cancelText, type } = options;
  return ElMessageBox.confirm(message, title, {
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    center: true, // 文本居中
    showClose: false, // 是否显示关闭按钮
    type,
    customClass: "my-custom-confirm", // 自定义样式类名
    dangerouslyUseHTMLString: false // 内容是否支持 HTML
  });
};
