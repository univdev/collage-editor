<style lang="less" scoped>

</style>

<template>
  <select
    v-bind="{ ...$attrs, ...$props }"
  >
    <slot></slot>
  </select>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    value: {
      required: false,
      default: null,
    },
  },
});
</script>
