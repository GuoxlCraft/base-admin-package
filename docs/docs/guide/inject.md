# 加载依赖

在安装公共依赖包到业务项目之后，还需要在业务项目的全局去加载依赖包才能够在页面和组件开发的时候使用依赖包的内容。



## 环境变量配置

在项目中，难免会碰到需要在不同环境下做不同的事，这时候，就需要自己去配置环境变量。目前`vue-element-admin`提供了四种环境变量。除了`base.env`是针对开发的时候，其他三种环境变量是针对打包的时候去构建不同环境的。目前主要的一个区别就是为了区分出接口前缀。

开发人员可以根据实际项目情况去进行扩展改造。

环境变量文件都存放在`config`文件夹中。

::: tip 提示
获取全局环境变量：process.env.xxx
:::