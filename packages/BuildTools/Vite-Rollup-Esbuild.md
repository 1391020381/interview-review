* 在Vite的构建流程中，ESBuild主要用于开发环境中的转译（transpilation）和压缩（minification）操作，这一部分主要突出其高速的转译能力。但对于生产环境的打包，Vite选择使用了Rollup。
虽然ESBuild也具备打包能力，但Rollup的打包能力更加强大和灵活。Rollup支持更多高级的特性，如Tree-shaking、Code-splitting等，可以生成更小的bundle并对生产环境进行优化。而且Rollup有着丰富的插件生态，让用户可以根据需要定制打包流程。
因此在许多情况下，Vite的处理方式是：在开发环境中使用ESBuild进行快速的模块热更新，而在打包生产环境中使用Rollup生成高效的项目包。但是这并不是绝对的，Vite提供的插件API允许你在构建过程中使用ESBuild进行压缩和使其转译。例如，Vite提供的官方插件vite-plugin-esbuild可以在Vite项目中使用ESBuild进行转译和压缩。
在Vite2.0以后的版本中，Vite使用Rollup打包构建生产环境，但仍然利用了ESBuild的压缩功能，用以加快生产环境的构建速度。