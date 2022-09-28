<template>
  <span>{{ content }}</span>
</template>
<script lang="ts">
export default {
  name: 'TableColumn'
}
</script>

<script setup lang="ts">
import defineVue from '@/main'
const { inject, computed } = (defineVue() as any) || {}
const props = defineProps({
  row: {
    type: Object,
    default: () => null
  },
  index: {
    type: Number,
    default: null
  },
  column: {
    type: Object,
    default: () => null
  },
  slotName: {
    type: String,
    default: ''
  }
})
const slots = inject('slots') as any
const content = computed(() => {
  slots[props.slotName as any]({
    row: props.row,
    column: props.column,
    $index: props.index
  })
})
</script>
