<style lang="less" scoped>
  .header-bar {
    width: 100%;
    height: 60px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EEE;
    display: flex;
  }
</style>

<template>
  <div class="header-bar">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderBar',
});
</script>
