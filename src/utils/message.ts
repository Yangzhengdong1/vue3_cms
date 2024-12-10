import { ElMessage } from "element-plus";

interface IMessageOptions {
  message: string;
  type?: "success" | "warning" | "info" | "error";
  duration?: number; // 显示时长
  showClose?: boolean; // 是否显示关闭按钮
  grouping?: boolean; // 是否允许分组
}

// Partial<T> 是 TS 内置工具类型，它可以将 T 中的所有类型变为可选
// 比如 IMessageOptions 中 message 是必选参数，在defaultOptions 中不写也可以
const defaultOptions: Partial<IMessageOptions> = {
  duration: 3000,
  showClose: false,
  grouping: false
};

// let lastMessage = "";
// let lastMessageType = "";
const message = (options: IMessageOptions | string) => {
  if (typeof options === "string") {
    options = { message: options };
  }

  const finalOptions = { ...options, ...defaultOptions };

  // 避免重复消息弹出
  // if (
  //   finalOptions.message === lastMessage &&
  //   finalOptions.type === lastMessageType
  // ) {
  //   return;
  // }

  // 更新最后一条消息记录
  // lastMessage = finalOptions.message;
  // lastMessageType = finalOptions.type || "info";

  return ElMessage(finalOptions);
};

message.success = (msg: string, options: Partial<IMessageOptions> = {}) =>
  message({ message: msg, type: "success", ...options });

message.info = (msg: string, options: Partial<IMessageOptions> = {}) =>
  message({ message: msg, type: "info", ...options });

message.warning = (msg: string, options: Partial<IMessageOptions> = {}) =>
  message({ message: msg, type: "warning", ...options });

message.error = (msg: string, options: Partial<IMessageOptions> = {}) =>
  message({ message: msg, type: "error", ...options });

export default message;
