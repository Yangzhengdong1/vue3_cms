export const accountRules = {
  username: [
    {
      required: true,
      message: "账号不能为空~",
      trigger: "blur"
    },
    {
      pattern: /^[\w\u4e00-\u9fa5]{2,10}$/,
      message: "用户名需为2~10位字母、数字或汉字~",
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
  ]
};
export const phoneRules = {
  num: [
    {
      required: true,
      message: "手机号不能为空~",
      trigger: "blur"
    },
    {
      pattern: /^(?:\+86)?1[3-9]\d{9}$/,
      message: "手机号有误，请确认后重新尝试~",
      trigger: "blur"
    }
  ],
  code: [
    {
      required: true,
      message: "验证码不能为空~",
      trigger: "blur"
    },
    {
      pattern: /^\d{6}$/,
      message: "验证码格式错误，正确格式为6位数字~",
      trigger: "blur"
    }
  ]
};
