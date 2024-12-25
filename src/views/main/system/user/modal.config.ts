import type { IFormItem, IForm } from "@/components/v-form";

const formItems: IFormItem[] = [
  {
    field: "username",
    defaultValue: "",
    type: "input",
    label: "昵称",
    placeholder: "请输入用户昵称"
  },
  {
    field: "password",
    defaultValue: "",
    type: "password",
    label: "密码",
    isHidden: true,
    placeholder: "请输入用户密码"
  },
  {
    field: "realname",
    defaultValue: "",
    type: "input",
    label: "真实姓名",
    placeholder: "请输入用户真实姓名"
  },
  {
    field: "phone",
    defaultValue: "",
    type: "input",
    label: "手机号",
    placeholder: "请输入手机号码",
    otherOptions: {
      maxlength: 11
    }
  },
  {
    field: "departmentId",
    defaultValue: "",
    type: "cascader",
    label: "所属部门",
    options: [],
    otherOptions: {
      filterable: true,
      relevance: true, // 需要根据部门请求角色列表
      props: {
        value: "wid",
        label: "name",
        children: "childrens",
        multiple: false,
        expandTrigger: "hover",
        checkStrictly: true,
        emitPath: false
      },
      style: { width: "100%" }
    },
    placeholder: "请选择用户所属部门"
  },
  {
    field: "roleId",
    defaultValue: "",
    type: "select",
    options: [],
    label: "用户角色",
    otherOptions: {
      filterable: true,
      props: {
        value: "wid",
        label: "name"
      }
    },
    placeholder: "请选择用户角色"
  },
  {
    field: "isActive",
    defaultValue: "",
    type: "select",
    label: "状态",
    placeholder: "请选择用户状态",
    options: [
      {
        label: "启用",
        value: true
      },
      {
        label: "禁用",
        value: false
      }
    ]
  },
  {
    field: "avatarUrl",
    defaultValue: "",
    type: "upload-img",
    label: "用户头像",
    placeholder: "请上传用户头像"
  }
];

const formRules = {
  username: [
    {
      required: true,
      message: "昵称不能为空~",
      trigger: "blur"
    },
    {
      pattern:
        /^(?=.*[\w\u4e00-\u9fa5\uac00-\ud7af])[\w\u4e00-\u9fa5\uac00-\ud7af @]{2,10}$/,
      message: "用户名需为2-10位，可包含字母、数字、汉字、空格、下划线或@符号~",
      trigger: "blur"
    }
  ],
  realname: [
    {
      required: true,
      message: "真实姓名不能为空~",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "密码不能为空~",
      trigger: "blur"
    },
    {
      pattern: /^[a-z0-9]{6,}$/,
      message: "密码应为6位或以上字母或数字~",
      trigger: "blur"
    }
  ],
  phone: [
    {
      required: true,
      message: "手机号不能为空~",
      trigger: "blur"
    }
  ]
};

const colLayout = { span: 24 };

const labelWidth = "80px";

export const modalFormConfig: IForm = {
  formItems,
  labelWidth,
  colLayout,
  formRules
};
