import { transform } from "sucrase";

interface ESMoudleType {
  exports: {
    __esModule: boolean;
    default: any;
    [key: string]: any;
  };
}

/**
 * sucrase 编译器
 * @param code 需要编译的代码,
 */
export const sucraseTransformCode = async (code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // 编译成功的代码，不需要sourceMap
      const buildProduct = transform(code, {
        transforms: ["typescript", "imports", "jsx"],
      }).code;
      resolve(buildProduct);
    } catch (error) {
      // 编译失败
      reject(error);
    }
  });
};





/**
 * 
 * @param code cjs代码
 * @param dependencies 模块依赖  当前的依赖的对象，如 react dayjs 这些，在低代码平台中可以使用刚才挂载的 husScope中的 depends对象
 * 使用Function执行代码时会进行类似 width的操作  可以看到在下面的是实现了 require方法来进行依赖的获取，并且将结果注入到 module字段当中
 */
export const compileModuleResolve = (
  code: string,
  dependencies: Record<string, any> = {}
) => {
  // 实现module函数，用来套动态执行的函数结果
  const module: ESMoudleType = {
    exports: {
      __esModule: false,
      default: null as unknown,
    },
  };

  // 实现一个require方法，用于模块执行时挂载依赖
  const require = (packageName: string) => {
    if (dependencies[packageName]) {
      return dependencies[packageName];
    }
  };
  
  // 动态执行
  Function("require, exports, module", code)(require, module.exports, module);
  return module;
};

/**
 * 往当前离线容器下注入CssModule，无需构建和编译
 * @param cssLongText 注入的css文本
 */
export const injectCssModule = (cssLongText: string) => {
  const style = document.createElement("style");
  style.innerHTML = cssLongText;
  document.head.appendChild(style);
};
