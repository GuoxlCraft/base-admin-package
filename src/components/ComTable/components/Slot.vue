<script lang="ts">
import { defineComponent, inject, PropType, h } from 'vue'

export default defineComponent({
  name: 'TableSlot',
  props: {
    row: {
      type: Object as PropType<IObj>,
      default: () => null
    },
    index: {
      type: Number as PropType<number>,
      default: null
    },
    column: {
      type: Object as PropType<IObj>,
      default: () => null
    },
    slotName: {
      type: String as PropType<string>,
      default: ''
    }
  },
  render() {
    const _this: any = inject('slots')
    return h(
      'span',
      _this[this.slotName as any]({
        row: this.row,
        column: this.column,
        $index: this.index
      })
    )
  }
})
</script>
