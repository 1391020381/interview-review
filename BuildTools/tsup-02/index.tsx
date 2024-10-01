import * as React from 'react'
import * as Server from 'react-dom/server'
// import { content } from './content'

// console.log("content: ", content);
let Greet = () => <h1>Hello, world!</h1>
console.log(Server.renderToString(<Greet />))