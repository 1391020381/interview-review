// @ts-nocheck
import React from "react";
import _ from "lodash";
// import { jsRuntime } from "../runtime";  // 非 vm实例
import { jsRuntime } from "@/vm";
import { useTranslation } from "react-i18next";
import { useCreateStore } from "../state";
import { App } from "antd";

export const useParseBinding = (
  props: Record<string, any>,
  events?: {
    name: string;
    fn: string;
  }[]
) => {
  const app = App.useApp();

  const { t } = useTranslation();
  const store = useCreateStore((selector) => selector.data);


  // React.useMemo 
  const memoizedProps = React.useMemo(() => {
    function evaluateProps(value: Record<string, any>) {
      if (typeof value === "object" && value !== null && "$$jsx" in value) {
        try {
          // example
        var evalExample =   window.eval(`
            (() => {
              with ({hous:{state:{title:123456}}}) {
                return (hous.state.title)
              }
            })()
          `);
          // 注意: eval在这里可能是不安全的!
          return jsRuntime.execute(value.$$jsx, {
            huos: {
              t,
              app,
              // $state: store,
              state: store.app,
            },
          })?.value;
        } catch {
          console.error("Unable to evaluate $$jsx", value.$$jsx);
          return value;
        }
      } else if (typeof value === "object" && value !== null) {
        const evaluated: Record<string, any> = {};
        for (const key in value) {
          evaluated[key] = evaluateProps(value[key]); // 递归求值
        }
        console.log('evaluated:',evaluated)
        return evaluated;
      } else {
        return value;
      }
    }
    var propsExample = {
      "$$children": {
          "$$jsx": "huos.state.title"
      }
  }
  var storeExample = {
    "app": {
        "title": "Title1"
    }
}
    console.log('binding.tsx:',props,store)
    return evaluateProps(props);
  }, [props, store]); // 左侧 useSchema storMap -> useCreateStore store  触发  memoizedProps

  const memoizedEvents = React.useMemo(() => {
    const eventMap: Record<string, Function> = {};
    // 事件处理
   var evalFun =  window.eval(`
      (() => {
        with ({}) {
          return (function test(){console.log(123456)})
        }
      })()
    `);
    var evalFun2 =  window.eval(`
      (() => {
        with ({a:function abc(){alert('abc')}}) {
          return (function test(){console.log(123456);console.log(a);a()})
        }
      })()
    `);
     // evalFun  ->   function test(){console.log(123456)}
    if (Array.isArray(events)) {
      _.forEach(events, ({ name = "", fn = "" }) => {
        console.log('name:',name);
        console.log('fn:',fn);
        const runFun = jsRuntime.execute(fn, {
          huos: {
            t, // 多语言
            app,
            getState: useCreateStore.getState, // 全局状态
          },
        })?.value;
        console.log('runFun:',runFun)
        eventMap[name] = runFun;
      });
    }

    return eventMap;
  }, [events]);
  
  
  return {
    ...memoizedProps,
    ...memoizedEvents,
  } as any;
};
