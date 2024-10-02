import { transform } from "sucrase";

// esmodule  import 和 export

const code1 = `export const fetch = ()=>{
    console.log(1)
    }`
// commonjs 语法  module.exports 或 exports    
//  "use strict";
//  Object.defineProperty(exports, "__esModule", {value: true}); 
//  const fetch = ()=>{
//     console.log(1)
//     }; 
// exports.fetch = fetch
const code = `

export const fetch = ()=>{
    console.log(1)
}
    `
  // 编译成功的代码，不需要sourceMap
  const buildProduct = transform(code, {
    transforms: ["typescript", "imports", "jsx"],
  }).code;
 console.log('buildProduct:',buildProduct) 
    

