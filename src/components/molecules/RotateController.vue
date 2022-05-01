<style lang="less" scoped>
  .rotate-controller {
    position: relative;
    .handle {
      border-radius: 50%;
      width: 10px;
      height: 10px;
      background-color: #EEE;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>

<template>
  <div class="rotate-controller">
    <div class="handle"></div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    onClick() {
      this.isActive = true;
    },
  },
});
</script>
