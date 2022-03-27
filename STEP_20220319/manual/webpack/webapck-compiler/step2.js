const { SyncHook } = require("tapable");

// step2 - plugins 相关
class Compiler {
  constructor(config) {
    this.config = config;
    this.root = process.cwd(); // nodejs当前 工作目录
    this.entry = config.entry;
    this.entryId = null;
    this.modules = {};

    this.processPlugins(config);
  }

  processPlugins = (config) => {
    this.hooks = {
      // 不同生命周期钩子，已按照生命周期的顺序声明
      entryOption: new SyncHook(), // 获取到 options 配置对象时触发
      afterPlugins: new SyncHook(), // 解析完 plugins 后触发，其实是调用apply完成插件注册后触发
      run: new SyncHook(), // 调用 run 方法时触发
      compile: new SyncHook(), // compile时触发
      afterCompile: new SyncHook(), // compile完成时触发
      emit: new SyncHook(), // emit 打包完成后，写时触发
      done: new SyncHook(), // 打包，发射，写入 dist 文件夹后，完成所有操作后触发
    };

    config.plugins?.forEach((plugin) => {
      plugin.apply(this);
      // this 指代的是compiler实例
      // 箭头函数中的this：指的是 箭头函数声明时所在作用域的 上层作用域中的this
    });
    this.hooks.afterPlugins.call(); // afterPlugins
  };

  getSource = () => {};

  parse = () => {};

  buildModules = () => {};
  emitFile = () => {};

  run = () => {
    this.hooks.run.call();

    this.hooks.compile.call();
    this.buildModules();
    this.hooks.afterCompile.call();

    this.emitFile();
    this.hooks.emit.call();
    this.hooks.done.call();
  };
}

const compiler = new Compiler(config);
compiler.hooks.entryOption.call();
compiler.run();
