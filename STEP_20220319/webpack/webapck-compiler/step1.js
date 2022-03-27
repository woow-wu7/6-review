// 前置
// 1
// path.resolve()
// - path.resolve([...paths])
// - 将 ( 路径 或 路径片段 ) 解析为 ( 绝对路径 )
// 2
// process.cwd()
// - 返回 nodejs进程的 ( 当前工作目录 )
// 3
// path.join()
// - 拼接path

const path = require("path");
const config = require("./webpack.config.js");

// step1 是未加入 plugin 的过程
class Compiler {
  constructor(config) {
    this.config = config;
    this.root = process.cwd(); // nodejs当前 工作目录
    this.entry = config.entry;
    this.entryId = null;
    this.modules = {};
  }

  /**
   * @description: getSource() 获取模块的源码
   * @param {string} moduleAbsolutePath 模块的绝对路径
   * @return {string} moduleSourceCodeString 返回源码
   */
  getSource = (moduleAbsolutePath) => {
    let moduleSourceCodeString = fs.readFileSync(moduleAbsolutePath, {
      // -------------------------------------------------------------------------------- 读取模块源码字符串
      encoding: "utf8",
    });

    const moduleRules = this.config.module.rules;

    for (let i = 0; i < moduleRules.lenth; i++) {
      const { test, use } = moduleRules[i];
      let lastLoaderIndex = use.lenth - 1;

      if (test.test(moduleAbsolutePath)) {
        function runLoader() {
          const currentLoader = require(use[lastLoaderIndex--]);

          moduleSourceCodeString = currentLoader(moduleSourceCodeString); // ------------ 每个loader处理源码字符串
          // 每个loader处理模块源码字符串后，返回处理后的源码字符串

          if (lastLoaderIndex >= 0) {
            runLoader(); // 遍历所有的loader并执行，递归执行所有loader
          }
        }
        runLoader();
      }
    }

    return moduleSourceCodeString; // --------------------------------------------------- 最终返回经过loader处理过后的源码字符串
  };

  /**
   * @description: parse() 解析源码字符串
   * @param {string} source 经过loader处理过的源码字符串
   * @param {string} parentPath 模块的父路径
   * @return {string} sourceCode 经过AST转化后的源码字符串
   * @return {array} dependencies 该模块依赖的模块的绝对路径 组成的数组
   */
  parse = (source, parentPath) => {
    // ( 源码string ) => ( AST ) => ( 遍历AST ) => ( 转换AST ) => ( 获取新的源码字符串 )
    // 1. @babel/parser -------------- 将源码string转成AST
    // 2. @babel/traverse ----------- 遍历AST，并在遍历过程中通过 @babel/types完成修改，添加，删除等操作
    // 3. @babel/types -------------- 修改，添加，删除AST的各个节点
    // 4. @babel/generator ---------- 将修改后的AST再转成源码字符串

    const dependencies = []; // 依赖数组

    // AST
    const AST = babelParser.parse(source);

    // 遍历
    babelTraverse(AST, {
      CallExpression(p) {
        const node = p.node;
        if (node.callee.name === "require") {
          node.callee.name = "__webpack_require__"; // ( require <=> __webpack_require__ )，即将 require 修改成 __webpack_require__
          let modulePath = node.arguments[0].value;
          modulePath =
            "./" +
            path.join(parentPath, modulePath).replace(/\\/g, "/") +
            (path.extname(modulePath) ? "" : ".js"); // 后缀存在就加空字符串即不做操作，不存在加.js

          // push
          dependencies.push(modulePath);

          // 转换
          node.arguments = [babelTypes.stringLiteral(modulePath)]; // 把AST中的arguments中的Literal修改掉 => 修改成最新的modulePath
        }
      },
    });

    // 生成
    const sourceCode = babelGenerator(AST).code;

    // 返回
    return { sourceCode, dependencies };
  };

  /**
   * @description: buildModules() 打包模块
   * @param {string} moduleAbsolutePath 该模块的绝对路径
   * @param {boolean} isEntry 是否是入口文件
   */
  buildModules = (moduleAbsolutePath, isEntry) => {
    const source = this.getSource(moduleAbsolutePath); // 经过所有loader处理过后的，该模块的 ( 源码字符串 )

    const moduleRelativePath = `./${path
      .relative(this.root, moduleAbsolutePath)
      .replace(/\\/g, "/")}`; // 获取相对路径，( ./src/index.js )
    const parentPath = path.dirname(moduleRelativePath); // 父路径 ( './src/index.js' => './src' )

    if (isEntry) {
      this.entryId = moduleRelativePath;
    }

    const { sourceCode, dependencies } = this.parse(source, parentPath);

    this.modules[moduleRelativePath] = sourceCode;

    // 该模块有依赖的模块，需要继续解析依赖的模块
    // 1.读取该模块的源码字符串
    // 2.用对应的loader解析该源码字符串
    // 3.将2获得的源码字符串，经过 @babel/parse转成AST，经过@babel/traverse遍历AST，经过@babel/types添加删除修改，经过@babel/generator生成AST转换后的源码字符串
    // 4.通过require，import等关键字，判断该模块的依赖的模块，并添加到 依赖数组中
    // 5.对每个依赖数组都执行以上过程
    // 6.最终得到的是：( 模块的相对路径 ) 和 ( 该模块经过loader+AST处理过后的源码字符串 )
    if (dependencies.length) {
      dependencies.forEach((dependency) =>
        this.buildModules(path.join(this.root, dependency))
      );
    }
  };

  // emitFile
  // 通过 fs.writeFileSync() 将源码字符串转成源码最终写入 dist 文件夹
  //-------------------------------------------------------------------------------emitFile
  emitFile = () => {
    // 用 modules 对象渲染我们的模板
    // 输出到哪些目录下
    const mainAbsolutePath = path.join(
      this.config.output.path,
      this.config.output.filename
    ); // 输出路径
    const templateStr = this.getSource(path.join(__dirname, "main.ejs"));
    const code = ejs.render(templateStr, {
      entryId: this.entryId,
      modules: this.modules,
    });
    this.assets = {};
    // map
    // path <=> code
    this.assets[mainAbsolutePath] = code;

    // 写文件
    fs.writeFileSync(mainAbsolutePath, this.assets[mainAbsolutePath]);
  };

  run = () => {
    const entryAbsolutePath = path.resolve(
      this.root,
      "7-compiler-step-recording",
      this.entry
    );

    this.buildModules(entryAbsolutePath, true);
    this.emitFile();
  };
}

const compiler = new Compiler(config);
compiler.run();
