<template>
  <transition name="viewer-fade">
    <div
      v-show="show"
      ref="el-image-viewer__wrapper"
      tabindex="-1"
      class="el-image-viewer__wrapper"
      :style="{ 'z-index': zIndex }"
    >
      <div class="el-image-viewer__mask"></div>
      <!-- CLOSE -->
      <span class="el-image-viewer__btn el-image-viewer__close" @click="hide">
        <i class="el-icon-close"></i>
      </span>
      <!-- ARROW -->
      <template v-if="!isSingle">
        <span
          class="el-image-viewer__btn el-image-viewer__prev"
          :class="{ 'is-disabled': !infinite && isFirst }"
          @click="prev"
        >
          <i class="el-icon-arrow-left"></i>
        </span>
        <span
          class="el-image-viewer__btn el-image-viewer__next"
          :class="{ 'is-disabled': !infinite && isLast }"
          @click="next"
        >
          <i class="el-icon-arrow-right"></i>
        </span>
      </template>
      <!-- ACTIONS -->
      <div class="el-image-viewer__btn el-image-viewer__actions">
        <div class="el-image-viewer__actions__inner">
          <i class="el-icon-zoom-out" @click="handleActions('zoomOut')"></i>
          <i class="el-icon-zoom-in" @click="handleActions('zoomIn')"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i :class="mode.icon" @click="toggleMode"></i>
          <i class="el-image-viewer__actions__divider"></i>
          <i class="el-icon-refresh-left" @click="handleActions('anticlocelise')"></i>
          <i class="el-icon-refresh-right" @click="handleActions('clocelise')"></i>
        </div>
      </div>
      <!-- CANVAS -->
      <div class="el-image-viewer__canvas">
        <template v-for="(url, i) in list">
          <img
            v-if="i === index"
            ref="img"
            :key="url"
            class="el-image-viewer__img"
            :src="currentImg"
            :style="imgStyle"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown"
            @click="select"
          />
        </template>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: 'Preview'
}
</script>

<script setup lang="ts">
import { isFirefox } from '_u/validate'
import { throttle } from 'lodash-es'
import { on, off } from '_u/dom-uitls'
import { ActionTypes } from './types'
import { watch, ref, reactive, computed, nextTick, getCurrentInstance } from 'vue'
const root = (getCurrentInstance() as any).proxy

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'el-icon-full-screen'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'el-icon-c-scale-to-original'
  }
}

const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel'

const index = ref(0)
const show = ref(false)
const list = ref([])
const zIndex = ref(2000)
const infinite = ref(true)
const loading = ref(false)
const onClose = ref<any>(null)
const onSelect = ref<any>(null)
const mode = ref(Mode.CONTAIN)
const transform = reactive({
  scale: 1,
  deg: 0,
  offsetX: 0,
  offsetY: 0,
  enableTransition: false
})
const _keyDownHandler = ref<any>(null)
const _mouseWheelHandler = ref<any>(null)
const _dragHandler = ref<any>(null)

const isSingle = computed(() => list.value.length <= 1)
const isFirst = computed(() => index.value === 0)
const isLast = computed(() => index.value === list.value.length - 1)
const currentImg = computed(() => list.value[index.value])
const imgStyle = computed(() => {
  const { scale, deg, offsetX, offsetY, enableTransition } = transform
  const style: {
    transform: string
    transition: string
    marginLeft: string
    marginTop: string
    maxWidth?: string
    maxHeight?: string
  } = {
    transform: `scale(${scale}) rotate(${deg}deg)`,
    transition: enableTransition ? 'transform .3s' : '',
    marginLeft: `${offsetX}px`,
    marginTop: `${offsetY}px`
  }
  if (mode.value === Mode.CONTAIN) {
    style.maxWidth = style.maxHeight = '100%'
  }
  return style
})

watch(index, () => {
  reset()
})

watch(currentImg, () => {
  nextTick(() => {
    const $img = (root.$refs.img as HTMLImageElement)[0]
    if (!$img.complete) {
      loading.value = true
    }
  })
})

watch(show, (val: boolean) => {
  if (val) {
    nextTick(() => {
      ;(root.$refs['el-image-viewer__wrapper'] as HTMLElement).focus()
      document.body.style.overflow = 'hidden'
      deviceSupportInstall()
    })
  } else {
    nextTick(() => {
      document.body.style.overflow = 'auto'
      deviceSupportUninstall()
    })
  }
})

function hide() {
  show.value = false
  if (typeof onClose.value === 'function') {
    onClose.value(index.value)
  }
}

function select() {
  if (typeof onSelect.value === 'function') {
    onSelect.value(index.value)
  }
}

function deviceSupportInstall() {
  _keyDownHandler.value = throttle((e) => {
    const keyCode = e.keyCode
    switch (keyCode) {
      // ESC
      case 27:
        hide()
        break
      // SPACE
      case 32:
        toggleMode()
        break
      // LEFT_ARROW
      case 37:
        prev()
        break
      // UP_ARROW
      case 38:
        handleActions('zoomIn')
        break
      // RIGHT_ARROW
      case 39:
        next()
        break
      // DOWN_ARROW
      case 40:
        handleActions('zoomOut')
        break
    }
  })
  _mouseWheelHandler.value = throttle((e) => {
    const delta = e.wheelDelta ? e.wheelDelta : -e.detail
    if (delta > 0) {
      handleActions('zoomIn', {
        zoomRate: 0.015,
        enableTransition: false
      })
    } else {
      handleActions('zoomOut', {
        zoomRate: 0.015,
        enableTransition: false
      })
    }
  })
  on(document, 'keydown', _keyDownHandler.value)
  on(document, mousewheelEventName, _mouseWheelHandler.value)
}

function deviceSupportUninstall() {
  off(document, 'keydown', _keyDownHandler.value)
  off(document, mousewheelEventName, _keyDownHandler.value)
  _keyDownHandler.value = null
  _keyDownHandler.value = null
}

function handleImgLoad() {
  loading.value = false
}

function handleImgError(e: any) {
  loading.value = false
  e.target.alt = '加载失败'
}

function handleMouseDown(e: any) {
  if (loading.value || e.button !== 0) return

  const { offsetX, offsetY } = transform
  const startX = e.pageX
  const startY = e.pageY
  _dragHandler.value = throttle((ev) => {
    transform.offsetX = offsetX + ev.pageX - startX
    transform.offsetY = offsetY + ev.pageY - startY
  })
  on(document, 'mousemove', _dragHandler.value)
  on(document, 'mouseup', () => {
    off(document, 'mousemove', _dragHandler.value)
  })

  e.preventDefault()
}

function reset() {
  transform.scale = 1
  transform.deg = 0
  transform.offsetX = 0
  transform.offsetY = 0
  transform.enableTransition = false
}

function toggleMode() {
  if (loading.value) return
  const modeNames = Object.keys(Mode)
  // const modeValues = Object.values(Mode);
  const modeValues = Object.keys(Mode).map((e) => {
    return Mode[e]
  })

  const index = modeValues.indexOf(mode.value)
  const nextIndex = (index + 1) % modeNames.length
  mode.value = Mode[modeNames[nextIndex]]
  reset()
}

function prev() {
  if (isFirst.value && !infinite.value) return
  const len = list.value.length
  index.value = (index.value - 1 + len) % len
}

function next() {
  if (isLast.value && !infinite.value) return
  const len = list.value.length
  index.value = (index.value + 1) % len
}

function handleActions(action: ActionTypes, options = {}) {
  if (loading.value) return
  const { zoomRate, rotateDeg, enableTransition } = {
    zoomRate: 0.2,
    rotateDeg: 90,
    enableTransition: true,
    ...options
  }
  switch (action) {
    case 'zoomOut':
      if (transform.scale > 0.2) {
        transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3))
      }
      break
    case 'zoomIn':
      transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3))
      break
    case 'clocelise':
      transform.deg += rotateDeg
      break
    case 'anticlocelise':
      transform.deg -= rotateDeg
      break
  }
  transform.enableTransition = enableTransition
}
</script>

<style lang="less" scoped>
.viewer-fade-enter-active {
  animation: viewer-fade-in 0.3s;
}

.viewer-fade-leave-active {
  animation: viewer-fade-out 0.3s;
}

@keyframes viewer-fade-in {
  0% {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

@keyframes viewer-fade-out {
  0% {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  100% {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
}
</style>
