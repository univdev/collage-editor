<style lang="less" scoped>
  .mask {
    position: fixed;
    z-index: 10000;
    background-color: rgba(255, 255, 255, .8);
    width: 100%;
    height: 100%;
    left: 0;
    top: 0%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<template>
  <teleport
    v-if="visible"
    to="body"
  >
    <div class="mask">
      <van-loading></van-loading>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },
});
</script>
