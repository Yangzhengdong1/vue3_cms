// node .\render\render.js -n welocome -u /welocome -nr

const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { program } = require("commander");

program.version("1.0.0").description("请输入指令");
program
  .option("-n", "--name <type>", "component name")
  .option("-u", "--url <url>", "router url") // 需要一个值
  .option("-nr", "--no router", "no router"); // 不需要任何值
program.parse(process.argv);

const [name, url] = program.args;
const { Nr } = program.opts();

if (!name || !url) {
  console.log("请输入组件名称/路由url");
  return;
}

// 模板路径
const vueTemplatePath = path.resolve(__dirname, "./vue_template.ejs");
const tsTemplatePath = path.resolve(__dirname, "./router_template.ejs");

// 将要生成的文件目录
const vuePath = path.resolve(__dirname, `../src/views/${url}`);
const tsPath = path.resolve(__dirname, `../src/router${url}`);

const vueData = { name };

const urlArr = url.split("/");
const tsData = {
  name,
  url,
  path: `@/views${url}/${urlArr[urlArr.length - 1]}.vue` // at(-1) node@18 开始支持
};

const renderFile = (
  template,
  templateData,
  filePath,
  suffixName,
  renderErrorMsg,
  mkdirErrorrMsg,
  renderSuccessMsg
) => {
  ejs.renderFile(template, templateData, {}, (err, str) => {
    if (err) {
      console.log(renderErrorMsg);
      return;
    }

    // 创建对应的目录
    try {
      fs.mkdirSync(filePath, { recursive: true });
    } catch (error) {
      console.log(mkdirErrorrMsg);
    }

    const vueOutputPath = path.join(
      filePath,
      `${templateData.name}.${suffixName}`
    );
    fs.writeFileSync(vueOutputPath, str, "utf-8");
    console.log(renderSuccessMsg, vueOutputPath);
  });
};

renderFile(
  vueTemplatePath,
  vueData,
  vuePath,
  "vue",
  "生成vue模板失败",
  "创建组件目录失败",
  "生成vue模板成功"
);

// 判断是否生成 router 文件
if (!Nr) {
  renderFile(
    tsTemplatePath,
    tsData,
    tsPath,
    "ts",
    "生成TS模板失败",
    "创建路由目录失败",
    "生成TS模板成功"
  );
}
