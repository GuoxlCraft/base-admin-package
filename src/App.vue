<template>
  <div class="app">
    <h1>Hello</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'App'
}
</script>

<style lang="less">
.size {
  height: 100%;
  min-width: @minWidth;
}

html,
body {
  .size;

  padding: 0;
  margin: 0;
}

.app {
  .size;

  background: @appBg;
}
</style>
