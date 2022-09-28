const modulesFiles = require.context('./modules', true, /\.ts$/)

const modules = modulesFiles.keys().reduce((modules: any, modulePath: any) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.includes('/index')
    ? modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')[0]
    : modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const directives = {
  ...modules
}

export default directives
