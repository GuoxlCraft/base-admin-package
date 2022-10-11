<template>
  <div :ref="keyName" class="showMore">
    <div v-if="title" class="showMore-header hasTitle" @click="show = !show">
      <div class="showMore-title">
        {{ title }}
      </div>
      <div class="showMore-tips" v-if="message">
        <el-tooltip effect="dark" :content="message" placement="right">
          <i class="el-icon-warning-outline"></i>
        </el-tooltip>
      </div>
      <div class="showMore-tool">
        <slot name="tool"></slot>
      </div>
      <i :class="['el-icon-arrow-down', { 'el-icon-arrow-down-transform': !show }]"></i>
    </div>
    <div v-else class="showMore-header" @click="show = !show">
      <div class="line"></div>
      <i :class="['el-icon-arrow-down', { 'el-icon-arrow-down-transform': !show }]"></i>
    </div>
    <div v-loading="loading" class="showMore-body--warp" :style="show ? 'height:auto' : 'height:0'">
      <div class="showMore-body" ref="ShowMoreBody">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ShowMore'
}
</script>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  defaultHide: {
    type: Boolean,
    default: false
  },
  keyName: {
    type: String,
    default: 'showMore'
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: null
  }
})
const show = ref(!props.defaultHide)
</script>

<style lang="less" scoped>
.showMore {
  width: 100%;
  height: 100%;
  margin-bottom: 10px;

  &-header {
    &.hasTitle {
      height: 52px;
      padding-bottom: 20px;
      border-bottom: 1px solid #d8dee4;
    }
    display: flex;
    height: 32px;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;

    .el-icon-arrow-down {
      transition: all 0.2s;
    }

    .el-icon-arrow-down-transform {
      transform: rotate(-180deg);
    }

    .line {
      height: 1px;
      margin-right: 30px;
      background: #f0f0f0;
      flex: 1 1 100%;
    }

    i {
      flex: 0 0 16px;
    }
  }

  &-title {
    position: relative;
    display: inline-block;
    margin-left: 10px;
    font-size: 18px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.85);

    &::after {
      position: absolute;
      top: 1px;
      left: -10px;
      width: 4px;
      height: 90%;
      background: #4c63ff;
      content: '';
    }
  }

  &-tips {
    display: flex;
    margin-right: auto;
    margin-left: 10px;
    align-items: center;
  }

  &-tool {
    display: flex;
    margin-right: 10px;
    margin-left: auto;
    align-items: center;
  }

  &-body {
    margin-bottom: 20px;
    &--warp {
      overflow: hidden;
      transition: height 0.3s ease;
    }
  }
}
</style>
