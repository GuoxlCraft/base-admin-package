<!--
 * @Author: your name
 * @Date: 2021-08-18 16:11:11
 * @LastEditTime: 2021-09-16 11:49:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \dsports-emloyee-webg:\BaiduNetdiskDownload\资料\资料\demo\element-admin\src\components\Tooltip\index.vue
-->
<template>
  <div class="ellipsis">
    <el-tooltip :disabled="!showTooltip" :content="content">
      <div
        ref="ellipsis"
        class="ellipsis-content"
        :class="`${showEllipsis ? rule : 'my'}-ellipsis`"
        :style="styleComputed"
      >
        {{ mycontent }}
      </div>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Ellipsis'
}
</script>

<script setup lang="ts">

import { IEVersion } from '_u/common'
import {
  ref,
  watch,
  computed,
  nextTick,
  onMounted,
  onActivated,
  getCurrentInstance
} from 'vue'
const root = (getCurrentInstance() as any).proxy

const props = defineProps({
  // 内容
  content: {
    type: String,
    default: '',
    required: true
  },
  // 是否显示tooltip
  showTooltip: {
    type: Boolean,
    default: false
  },
  // 是否开启显示省略号
  showEllipsis: {
    type: Boolean,
    default: true
  },
  // 显示方式优先级，都设置的话根据优先级高度，行数，字符数来，否则哪个有值用哪个
  // 按高度显示省略号
  height: {
    type: [Boolean, Number],
    default: 0
  },
  // 按行数显示省略号
  rows: {
    type: Number,
    default: 0
  },
  // 字符数显示省略号
  chars: {
    type: Number,
    default: 0
  }
})

const number = ref(0)
const mycontent = ref(props.content)
const watchArr = computed(() => [props.height, props.rows, props.chars, props.showEllipsis])
const styleComputed = computed(() => {
  return { '--number': number.value } as any
})
const rule = computed(() => {
  // eslint-disable-next-line
  number.value = props.rows || props.chars || (typeof props.height === 'number' ? props.height : 0)
  if (props.height) {
    return 'height'
  } else if (props.rows) {
    return 'rows'
  } else if (props.chars) {
    return 'chars'
  }
  return ''
})

watch(
  watchArr,
  () => {
    nextTick(() => {
      setEllipsis()
    })
  },
  {
    deep: true
  }
)

onMounted(() => {
  setEllipsis()
})

onActivated(() => {
  root.$forceUpdate() // 强制更新
})

function setEllipsis() {
  mycontent.value = props.content
  if (rule.value === 'chars') {
    setChars()
  } else if (rule.value === 'height') {
    setHeights()
  } else if (rule.value === 'rows') {
    // 兼容ie
    setRows()
  }
}
function setRows() {
  const type = IEVersion()
  if (type === -1) {
    // 不是ie浏览器
    return false
  }
  const ellipsis = root.$refs.ellipsis as HTMLDivElement
  ellipsis.innerText = props.content // 导致数据是去mvvm效果
  if (!props.showEllipsis) {
    return false
  }

  if (!number.value) {
    return false
  }
  const currentLineHeight = parseFloat(window.getComputedStyle(ellipsis).lineHeight as string)
  // (ellipsis.offsetHeight - this.number * currentLineHeight) > currentLineHeight//ie算出来高度会有偏差导致会有输入相邻不同行数渲染出来行数一样的问题，比如3,4|8,9等
  while (
    ellipsis.offsetHeight > number.value * currentLineHeight &&
    ellipsis.offsetHeight - number.value * currentLineHeight > currentLineHeight
  ) {
    // ellipsis.innerText = ellipsis.innerText.substring(0, ellipsis.innerText.length - 1)
    ellipsis.innerText = ellipsis.innerText.replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, '...')
  }

  // ellipsis.innerText = ellipsis.innerText.substring(0, ellipsis.innerText.length - 1) + '...'
}

function setChars() {
  if (!props.showEllipsis) {
    return false
  }
  if (number.value < props.content.length) {
    nextTick(() => {
      mycontent.value = props.content.substring(0, number.value) + '...'
    })
  }
}

function setHeights() {
  const pellipsis = (root.$refs.ellipsis as HTMLDivElement).parentNode as HTMLDivElement
  const ellipsis = root.$refs.ellipsis as HTMLDivElement
  const currentLineHeight = parseFloat(window.getComputedStyle(ellipsis).lineHeight as string)
  if (!props.showEllipsis) {
    ellipsis.innerText = props.content // 导致数据是去mvvm效果
    return false
  }
  let height: number = pellipsis.offsetHeight
  if (typeof props.height === 'number') {
    height = number.value
  }
  if (ellipsis.offsetHeight < height) {
    ellipsis.innerText = props.content
  }
  while (ellipsis.offsetHeight > height && ellipsis.offsetHeight > currentLineHeight) {
    // 改成mvvm的写法
    ellipsis.innerText = ellipsis.innerText.replace(/(\s)*([a-zA-Z0-9]+|\W)(\.\.\.)?$/, '...')
  }
}
</script>

<style scoped lang="less">
.ellipsis {
  .ellipsis-content {
    word-break: break-all;
  }

  .rows-ellipsis {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: var(--number);
  }
}
</style>
