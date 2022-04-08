const fs = require('fs');
const babylon = require('babylon')
const traverse = require('babel-traverse').default
function createAsset(filename) {
    const content = fs.readFileSync(filename, 'utf-8');
    const ast = babylon.parse(content, {
        sourceType: 'module'
    })
    const dependencies = []
    traverse(ast, {
        ImportDeclaration: ({ node }) => {
            console.log(node)
            dependencies.push(node.source.value)
        }
    })
}
createAsset('./src/entry.js')