<template>
  <div
    class="marquee-wrap"
    :class="classes"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div class="marquee__scroll" :style="scrollStyle">
      <div ref="content" class="marquee__content">
        <slot></slot>
      </div>
      <div class="marquee__copy-content" v-html="copyHtml"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Marquee'
}
</script>

<script setup lang="ts">
import { requestAnimationFrame, cancelAnimationFrame } from '_u/animation'
import { DirectionType } from './types'
import defineVue from '@/main'
const {
  watch,
  ref,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  getCurrentInstance
} = defineVue() as any
const root = (getCurrentInstance() as any).proxy

const props = defineProps({
  // 滚动数据，用作监听数据变更，更新html
  data: {
    type: Array,
    default: () => []
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false
  },
  // 滚动方向，可选'up', 'down', 'left', 'right'
  direction: {
    type: String,
    default: 'up',
    validator: (val: string) => {
      return ['up', 'down', 'left', 'right'].includes(val)
    }
  },
  // 是否自动开始
  auto: {
    type: Boolean,
    default: true
  },
  // 滚动速度，数值越大速度越快
  speed: {
    type: Number,
    default: 1
  },
  // 间隔滚动停顿等待时间
  waitTime: {
    type: Number,
    default: 3000
  },
  // 间隔滚动，每次滚动的长度，单位px
  scrollLength: {
    type: Number,
    default: 0
  }
})

const timerId = ref(null)
const resumeId = ref(null)
const copyHtml = ref('')
const contentWidth = ref(0)
const contentHeight = ref(0)
const scrollPosition = ref(0)
const isPause = ref(false)
const data = computed(() => props.data)
const disabled = computed(() => props.disabled)
const isHorizontal = computed(() => ['left', 'right'].includes(props.direction as DirectionType))
const classes = computed(() => {
  return {
    'marquee--horizontal': isHorizontal.value,
    'is-disabled': props.disabled
  }
})
const scrollStyle = computed(() => {
  return {
    transform: isHorizontal.value
      ? `translate3d(-${scrollPosition.value}px, 0, 0)`
      : `translate3d(0, -${scrollPosition.value}px, 0)`,
    width: isHorizontal.value ? `${2 * contentWidth.value}px` : '100%'
  }
})

watch(
  data,
  () => {
    nextTick(renderCopyHtml)
  },
  {
    immediate: true
  }
)

watch(disabled, (val: boolean) => {
  stop()
  if (val) {
    copyHtml.value = ''
    scrollPosition.value = 0
  } else {
    nextTick(renderCopyHtml)
    props.auto && start()
  }
})

function renderCopyHtml() {
  if (!root.$refs.content || props.disabled) return
  copyHtml.value = (root.$refs.content as HTMLElement).innerHTML
  updateView()
}

function updateView() {
  if (!root.$refs.content) return
  const rect = (root.$refs.content as HTMLElement).getBoundingClientRect()
  // 内容必须要撑开高度宽度
  contentHeight.value = rect.height
  contentWidth.value = rect.width
  root.$emit('resize', rect, root)
}

/**
 * 开始滚动
 * @method start
 */
function start() {
  isPause.value = false
  switch (props.direction) {
    case 'up':
      scrollPosition.value = scrollPosition.value || 0
      scrollUp()
      break
    case 'down':
      scrollPosition.value = scrollPosition.value || contentHeight.value
      scrollDown()
      break
    case 'left':
      scrollPosition.value = scrollPosition.value || 0
      scrollLeft()
      break
    case 'right':
      scrollPosition.value = scrollPosition.value || contentWidth.value
      scrollRight()
      break
  }
}

/**
 * 停止
 * @method stop
 */
function stop() {
  timerId.value && cancelAnimationFrame(timerId.value)
  resumeId.value && clearTimeout(resumeId.value)
}

function scrollUp() {
  timerId.value = requestAnimationFrame(() => {
    if (isPause.value) return
    scrollPosition.value += props.speed
    if (resume()) {
      isPause.value = true
      return
    }
    if (scrollPosition.value >= contentHeight.value) {
      scrollPosition.value = 0
    }
    scrollUp()
  })
}

function scrollDown() {
  timerId.value = requestAnimationFrame(() => {
    if (isPause.value) return
    scrollPosition.value -= props.speed
    if (resume()) {
      isPause.value = true
      return
    }
    if (scrollPosition.value <= 0) {
      scrollPosition.value = contentHeight.value
    }
    scrollDown()
  })
}

function scrollLeft() {
  timerId.value = requestAnimationFrame(() => {
    if (isPause.value) return
    scrollPosition.value += props.speed
    if (resume()) {
      isPause.value = true
      return
    }
    if (scrollPosition.value >= contentWidth.value) {
      scrollPosition.value = 0
    }
    scrollLeft()
  })
}

function scrollRight() {
  timerId.value = requestAnimationFrame(() => {
    if (isPause.value) return
    scrollPosition.value -= props.speed
    if (resume()) {
      isPause.value = true
      return
    }
    if (scrollPosition.value <= 0) {
      scrollPosition.value = contentWidth.value
    }
    scrollRight()
  })
}

function resume() {
  const value = Math.floor(scrollPosition.value) % props.scrollLength
  const match = value === 0
  if (match) {
    resumeId.value && clearTimeout(resumeId.value)
    resumeId.value = setTimeout(start, props.waitTime)
  }
  return match
}

function handleMouseEnter() {
  stop()
  isPause.value = true
}

function handleMouseLeave() {
  start()
}

onMounted(() => {
  props.auto && !props.disabled && start()
})

onUnmounted(() => {
  stop()
  copyHtml.value = ''
})
</script>

<style lang="less" scoped>
.marquee-wrap {
  overflow: hidden;

  .marquee__scroll {
    width: 100%;
    height: 100%;
  }
}

.marquee--horizontal {
  .marquee__content,
  .marquee__copy-content {
    display: inline-block;
    white-space: nowrap;
  }
}
</style>
