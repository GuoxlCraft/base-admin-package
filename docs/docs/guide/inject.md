# 加载依赖

在安装公共依赖包到业务项目之后就能够在业务项目中加载需要的组件、业务钩子和工具类来使用了。


## 组件（components）

公共依赖提供了丰富的组件，用于业务项目的日常开发。
:::tip 提示
本依赖库暂不提供完整引入的功能，请期待后续的功能支持。
:::

目前依赖库提供，更多的组件期待后续丰富。

```sh
  ComTable, // 表格
  SvgIcon,  // SVG
  ComSearch, // 搜索栏
  ComDialog, // 弹窗
  ComDetail, // 详情
  ComForm,   // 表单
  Echart,    // Echart
  Marquee,   // 无限循环列表
  Preview,   // 图片预览
  ElMessage, // 弹窗提示（element优化版）
  showMore   // 下拉展示
````

您可以在 main.js 中写入

```
import Vue from 'vue'
import {
  ComTable,
  SvgIcon,
  ComSearch,
  ComDialog,
  ComDetail,
  ComForm,
  Echart,
  Ellipsis,
  Marquee,
  Preview,
  ElMessage
  showMore
} from 'base-admin'

// register globally
Vue.component('ComTable', ComTable)
Vue.component('SvgIcon', SvgIcon)
Vue.component('ComSearch', ComSearch)
Vue.component('ComDialog', ComDialog)
Vue.component('ComDetail', ComDetail)
Vue.component('ComForm', ComForm)
```

## 业务钩子（Hooks）

本公共依赖也根据日常业务开发，提供了部分**业务钩子**。业务钩子对部分开发工作作简化封装。以一下三个Hooks举使用例子。

### 配置浏览器本地存储的方式  （useCache）

配置浏览器本地存储的方式，可直接存储对象数组。

使用方式

```
import { $hooks } from 'base-admin'
const { wsCache } =  $hooks.useCache('sessionStorage')
wsCache.set('XXX', 'xxxx') // 存入sessionStorage （默认）
const res = wsCache.get('XXX') //  'xxxx' 

```
```
import { $hooks } from 'base-admin'
const { wsCache } =  $hooks.useCache('localStorage')
wsCache.set('XXX', 'xxxx') // 存入localStorage
const res = wsCache.get('XXX') //  'xxxx' 

```

### 使用表单 （useForm）

使用方式
首先引入$hooks，在$hooks.web.useForm()的方法中会回调多个api供使用

```sh
    register, //向hook注册该表单组件，生成实例
    formRef,  // 获取表单ref的实例
    formData, // 表单所绑定的数据
    setProps, // 设置表单项目的某个属性。 传入三个参数 分别是，表单项的field、需要设置的属性的key，值
    addSchema, // 添加表单项目
    delSchema, // 删除表单项目
    setValue,  // 设置绑定数据的值。 传入两个参数 key和value 
    forceUpdateSchema //前置更新表单，使得当前表单项目与数据重新绑定
```

在template中的com-form 中绑定register向hook注册该表单组件，生成实例

````
<com-form :schema="formSchema" @register="register" @submit.native.prevent />
````

然后你可以通过formData来获取表单实时更新的绑定值，或者使用setProps控制表单项目的属性，比如输入框的禁用或者下拉项变更等。你还可以使用
unref(formRef).validate的方式进行表单验证。
````
import { $hooks } from 'base-admin'
const { register, formRef, formData, setProps, setValue } = $hooks.web.useForm()

const formSchema: FormSchemaConfig[] = [
  {
    field: 'field1',
    label: '单选框',
    component: 'Radio',
    value: '1',
    formItemProps: {
      rules: [requiredRule]
    },
    options: [
      {
        label: '选项1',
        value: '1'
      },
      {
        label: '选项2',
        value: '2'
      }
    ],
    onChange: (item) => {
      console.log(item)
    }
  }
]

function submit() {
  unref(formRef).validate((valid: boolean) => {
    if (valid) {
      console.log(formData.value)
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

function reset() {
  unref(formRef).resetFields()
}
````

### 使用表格 （useWork）

使用方式
首先引入$hooks，在$hooks.web.useWork()的方法中会回调多个api供使用

```sh
  defaultParams, // 默认参数 例如 pageIndex、pageSize
  selectionData, // 多选表格选中的row
  currentRow,   // 单选表格选中的row
  tableData, // 表格数据
  loading, 
  total,
  dialogVisible, // 是否展示弹窗 
  dialogTitle,  // 弹窗标题
  comName,  // 组件名称
  dialogWidth,  // 弹窗宽度
  rowData, // 传送的数据
  otherParams, // 需要传给后端的其他参数
  handleSelectionChange,   // 多选变化的时候
  handleCurrentRowChange, // 单选变化的时候
  toggleVisible,  // 改变弹窗dialogVisible
  getList,// 请求数据
  searchSubmit,  // 查询
  resetSubmit,  // 重置
  handleSizeChange,  // 展示多少条
  handleCurrentChange,  // 展示第几页
  dels,  // 删除多选
  open,  // 打开弹窗
  refreshTable  //重新请求数据
```

在template中的com-search 和 com-table 中去绑定useWork() 返回的api 

````

    <div class="search__example--wrap">
      <com-search :schema="searchData" @search-submit="searchSubmit" @reset-submit="resetSubmit" />
    </div>

    <com-table
      v-loading="loading"
      :columns="columns"
      :data="tableData"
      :pagination="{
        currentPage: defaultParams.pageIndex,
        total: total,
        onSizeChange: handleSizeChange,
        onCurrentChange: handleCurrentChange
      }"
    />

````
````
import { $hooks } from 'base-admin'
const {
  defaultParams,
  tableData,
  loading,
  total,
  dialogVisible,
  dialogTitle,
  comName,
  rowData,
  handleSizeChange,
  handleCurrentChange,
  toggleVisible,
  getList,
  searchSubmit,
  resetSubmit,
  open,
  refreshTable
} = useWork({
  listFun: requestApi // 请求接口的回调 返回 promise，列表接口的数据接口为 {list:array，total：number}
})

const searchData: FormSchemaConfig[] = [
  {
    label: '角色名',
    value: '',
    component: 'Input',
    field: 'roleName',
    componentProps: {
      placeholder: '请输入角色名',
      clearable: true
    }
  }
]
const columns = [
  {
    field: 'roleName',
    label: '角色名'
  },
  {
    label: '备注',
    field: 'remark'
  },
  {
    field: 'action',
    label: '操作',
    width: '80px'
  }
]

getList()
````

## 工具类和指令 （Utils & Directive）

本依赖库还提供了丰富的工具类和vue的自定义指令

### 工具类

提供的工具类丰富多样，就不一一说明了。这里以深拷贝（deepClone）的使用举例。

```
const { deepClone } = $utils
const obj = deepClone(item)
```

### 指令

提供了部分vue自定义指令，这里以权限控制指令为例。

只需要在main.js中引入全局指令，其中包含了权限控制、剪贴板等。就能在项目中使用了。

```
import { importDirective } from 'base-admin' // 引入全局指令
importDirective(Vue)
```
