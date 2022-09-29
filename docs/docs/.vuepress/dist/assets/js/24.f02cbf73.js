(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{385:function(t,s,a){"use strict";a.r(s);var n=a(45),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"preview-预览"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#preview-预览"}},[t._v("#")]),t._v(" Preview 预览")]),t._v(" "),a("p",[t._v("抽取于 "),a("code",[t._v("Element")]),t._v(" 的图片预览组件进行改造，实现函数式调用组件，无需基于图片进行点击预览。")]),t._v(" "),a("p",[a("code",[t._v("Preview")]),t._v(" 组件代码位于"),a("code",[t._v("src/components/Preview")])]),t._v(" "),a("h2",{attrs:{id:"使用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用"}},[t._v("#")]),t._v(" 使用")]),t._v(" "),a("div",{staticClass:"language-vue extra-class"},[a("pre",{pre:!0,attrs:{class:"language-vue"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("lang")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("ts"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}},[a("span",{pre:!0,attrs:{class:"token language-javascript"}},[t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" defineComponent"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" ref "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vue/composition-api'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" PreviewPic "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'_c/Preview'")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("defineComponent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" imgList "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ref"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("IObj"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://img1.baidu.com/it/u=657828739,1486746195&fm=26&fmt=auto&gp=0.jpg'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://img0.baidu.com/it/u=3114228356,677481409&fm=26&fmt=auto&gp=0.jpg'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://img1.baidu.com/it/u=508846955,3814747122&fm=26&fmt=auto&gp=0.jpg'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://img1.baidu.com/it/u=3536647690,3616605490&fm=26&fmt=auto&gp=0.jpg'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://img1.baidu.com/it/u=4087287201,1148061266&fm=26&fmt=auto&gp=0.jpg'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://img2.baidu.com/it/u=3429163260,2974496379&fm=26&fmt=auto&gp=0.jpg'")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("showHasImg")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("i"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" number")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("PreviewPic")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        index"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" i"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n        list"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" imgList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("value\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      imgList"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n      showHasImg\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])]),a("h2",{attrs:{id:"attributes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#attributes"}},[t._v("#")]),t._v(" Attributes")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("属性")]),t._v(" "),a("th",[t._v("说明")]),t._v(" "),a("th",[t._v("类型")]),t._v(" "),a("th",[t._v("可选值")]),t._v(" "),a("th",[t._v("默认值")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("index")]),t._v(" "),a("td",[t._v("默认展示第几张图片")]),t._v(" "),a("td",[t._v("number")]),t._v(" "),a("td",[t._v("—")]),t._v(" "),a("td",[t._v("0")])]),t._v(" "),a("tr",[a("td",[t._v("list")]),t._v(" "),a("td",[t._v("需要预览的图片列表")]),t._v(" "),a("td",[t._v("array")]),t._v(" "),a("td",[t._v("—")]),t._v(" "),a("td",[t._v("[]")])]),t._v(" "),a("tr",[a("td",[t._v("zIndex")]),t._v(" "),a("td",[t._v("层级")]),t._v(" "),a("td",[t._v("number")]),t._v(" "),a("td",[t._v("—")]),t._v(" "),a("td",[t._v("2000")])]),t._v(" "),a("tr",[a("td",[t._v("infinite")]),t._v(" "),a("td",[t._v("是否无缝")]),t._v(" "),a("td",[t._v("boolean")]),t._v(" "),a("td",[t._v("false/true")]),t._v(" "),a("td",[t._v("true")])]),t._v(" "),a("tr",[a("td",[t._v("onClose")]),t._v(" "),a("td",[t._v("关闭时的回调")]),t._v(" "),a("td",[t._v("function")]),t._v(" "),a("td",[t._v("—")]),t._v(" "),a("td",[t._v("—")])]),t._v(" "),a("tr",[a("td",[t._v("onSelect")]),t._v(" "),a("td",[t._v("点击时的回调")]),t._v(" "),a("td",[t._v("function")]),t._v(" "),a("td",[t._v("—")]),t._v(" "),a("td",[t._v("—")])])])])])}),[],!1,null,null,null);s.default=e.exports}}]);