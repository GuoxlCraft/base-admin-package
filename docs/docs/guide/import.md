# 安装依赖

使用本依赖库，需要先进入依赖库根目录，运行`npm run build`打包。打出来的umd包能够通过npm发布。您可以选择发布npm的公共包，但则需要在[npm](https://www.npmjs.com/)上注册账号等，详细的发包流程可以阅读[发布依赖到npm公库流程](https://www.jianshu.com/p/9325240352a4)。

由于公共库发包过程复杂，这里建议使用私库方案来使用本依赖库。推荐的npm私库方案有 yalc 和 yarn/cnpm link。

::: tip 提示
使用vite搭建的业务项目，需要注意一下。vite对第三方依赖有预编译缓存的功能，为了加快esbuild的效率。因此，在依赖库拓展开发后无法更新到被引入的业务项目中去（vite优先加载node_modules中 .vite/deps 的缓存）。这使得要更新依赖库需要手动删除node_modules，重新安装。在后续，会想办法解决（困扰）。
另外，由于npm link对依赖库中的循环引用的问题处理的不好，本依赖包不推荐使用npm link。可以尝试用cnpm link或者yarn link。
:::

## yalc

[yalc](https://github.com/wclr/yalc) 可以在本地将 npm 包模拟发布，将发布后的资源存放在一个全局存储中。然后可以通过 [yalc](https://github.com/wclr/yalc) 将包添加进需要引用的项目中。

这时候 package.json 的依赖表中会多出一个 file:.yalc/... 的依赖包，这就是 [yalc](https://github.com/wclr/yalc) 创建的特殊引用。同时也会在项目根目录创建一个 yalc.lock 确保引用资源的一致性。

首先您需要全局安装yalc

```sh
npm install yalc -g
```

在依赖库根目录下执行

```sh
npm run build && yalc publish
```

在项目目录下执行

```sh
yalc add base-admin
```

这里会将本次构建的base-admin依赖库安装到项目中。在业务项目的根目录生成一份.yalc的目录，存放依赖包。在package.json中通过file:.yalc/...指向该包形成依赖关系。

```sh
  "dependencies": {
    "@babel/runtime": "^7.16.0",
    "axios": "^0.24.0",
    "base-admin": "file:.yalc/base-admin", //yalc 生产的base-admin的依赖关系
    "core-js": "^3.19.0",
    ...
  }
```

:::tip 提示

这里补充一下yalc在依赖库更新时的用法。

当对本依赖库进行拓展开发时，需要变更依赖库中package.json的版本号。

:::

```sh
  "name": "base-admin",
  "version": "1.1.0", // 在更新了依赖库之后，需要更新version的值。yalc才会进行响应
  "description": "起源项目的基础依赖包",
  "main": "dist/main.js",
```
然后在依赖库根目录下执行

```sh
npm run build && yalc push
```

新版本的依赖库，会自动同步更新到所有引入该依赖库的业务项目中。

## yarn link/cnpm link

这两种方式的发包流程大致相同，都是对[npm link](https://docs.npmjs.com/cli/v8/commands/npm-link/)的优化升级，这里就以 yarn 举例。

同样首先您需要全局安装yarn或者cnpm

在依赖库根目录下执行

```sh
npm run build && yarn link
```

此时yarn会在全局存入一份该依赖包。

在项目目录下执行

```sh
yarn link base-admin
```

这里会将本次构建的base-admin依赖库安装到项目中。
在业务项目的node_modules中添加base-admin的依赖包。

:::tip 提示

当对本依赖库进行拓展开发时，同需要变更依赖库中package.json的版本号。

:::
然后在依赖库根目录下执行

```sh
npm run build
```

新打出来的包，会直接更新到所有引入该依赖库的业务项目中。






