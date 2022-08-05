let createRollupConfig = require('./rollup.config')

let path = require('path')

const rollup = require('rollup');

async function build(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions);
  const {code, map} = await bundle.generate(outputOptions);

  await bundle.write(outputOptions);
}


async function start() {
  let modules = ['sdk-core', 'sdk-vue', 'sdk-vue3'].map(key => {
    return {
      name: key,
      input: path.resolve(__dirname, `../packages/${key}/src/index.ts`)
    }
  })

  for (let config of modules) {
    const es = build(createRollupConfig(config.name, config.input, true), {
      file: path.resolve(__dirname, `../packages/${config.name}/esm/index.js`),
      format: 'es'
    })
    const cjs = build(createRollupConfig(config.name, config.input, false), {
      file: path.resolve(__dirname, `../packages/${config.name}/lib/index.js`),
      format: 'cjs'
    })
    await Promise.all([es, cjs])
  }
}

console.log('===start scripts===')
start().then(() => {
  console.log('===end scripts===')
})


