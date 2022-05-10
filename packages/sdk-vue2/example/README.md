


## 注意

`vue-template-compiler`会判断当前目录下的vue版本，
```js
try {
  var vueVersion = require('vue').version
} catch (e) {}
```

在该monorepo中依赖了多个vue版本，可能导致获取的`vueVersion`错误，

临时解决的话，可以修改`.pnpm/vue-template-compiler@2.6.14/node_modules/vue-template-compiler/index.js`

```js
try {
  // 显式指定vue版本
  var vueVersion = require('vue').version
} catch (e) {}
```
