const execa = require('execa')
const args = require('minimist')(process.argv.slice(2))

// 需要发布的包
const targets = args._

publishAll(targets)

async function publish(target) {
  const options = {
    cwd: `./packages/${target}`,
    stdio: 'inherit'
  }
  // todo修改patch参数
  await execa(`npm`, ['version', 'patch', '-no-git-tag-version'], options)
  // 使用pnpm，将工作区协议的版本号自动替换
  await execa(`pnpm`, ['pack'], options)
  await execa(`pnpm`, ['publish', '--no-git-checks', '--access', 'public'], options)
}

function publishAll(targets) {
  if(!targets.length) {
    targets = ['sdk-core', 'sdk-vue3']
  }
  for (const target of targets) {
    publish(target)
  }
}

