const typescript = require("rollup-plugin-typescript2")
const resolve = require('@rollup/plugin-node-resolve')

const path = require('path')

module.exports = (name, input, declaration = false) => {
  const external = ['vue', 'vue-router', 'react']

  if (['sdk-vue','sdk-vue3', 'sdk-vue2'].includes(name)) {
    external.push('@footprint/sdk-core')
  }

  return {
    input,
    plugins: [
      resolve.default({
        // 将自定义选项传递给解析插件
        customResolveOptions: {
          moduleDirectories: ['node_modules']
        }
      }),
      typescript({
        tsconfigDefaults: {
          exclude: [path.resolve(__dirname, `../packages/${name}/node_modules`)],
          include: [path.resolve(__dirname, `../packages/${name}/src`)],
          compilerOptions: {
            target: 'ES2018',
            module: 'esnext',
            declaration: declaration
          }
        }

      })
    ],
    external
  };
}
