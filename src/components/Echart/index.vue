<template>
  <div ref="echartRef" :class="className" :style="{ height: height, width: width }"></div>
</template>

<script lang="ts">
export default {
  name: 'Echart'
}
</script>

<script setup lang="ts">
import defineVue from '@/main'
import type { EChartsOption } from 'echarts'
import echarts from '@/plugins/echarts'
import { debounce } from 'lodash-es'
import 'echarts-wordcloud'
const { onMounted, watch, computed, onBeforeUnmount, onActivated, getCurrentInstance } =
  defineVue() as any

const root = getCurrentInstance()?.proxy as any

const props = defineProps({
  options: {
    type: Object,
    required: true
  },
  className: {
    type: String,
    default: ''
  },
  height: {
    type: String,
    default: '500px'
  },
  width: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'default'
  }
})

let chartRef: Nullable<echarts.ECharts> = null
let sidebarElm: Nullable<Element | any> = null
let __resizeHandler: Nullable<any> = null
const echartOptions = computed(() => props.options)

watch(
  echartOptions,
  (options: EChartsOption) => {
    ;(chartRef as echarts.ECharts).setOption(options)
  },
  {
    deep: true
  }
)

function initChart() {
  chartRef = echarts.init(root.$refs.echartRef as HTMLCanvasElement, props.theme)
  chartRef.setOption(props.options)
}

function sidebarResizeHandler(e: any): void {
  if (e.propertyName === 'width') {
    if (__resizeHandler) {
      __resizeHandler()
    }
  }
}

onMounted(() => {
  initChart()

  __resizeHandler = debounce(() => {
    if (chartRef) {
      chartRef.resize()
    }
  }, 100)
  window.addEventListener('resize', __resizeHandler)
  sidebarElm = document.getElementsByClassName('sidebar__wrap')[0]
  sidebarElm && sidebarElm.addEventListener('transitionend', sidebarResizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', __resizeHandler)

  sidebarElm && sidebarElm.removeEventListener('transitionend', sidebarResizeHandler)
})

onActivated(() => {
  // 防止keep-alive之后图表变形
  if (chartRef) {
    chartRef.resize()
  }
})
</script>
