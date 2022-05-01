<style lang="less" scoped>

</style>

<template>
  <van-dialog
    v-bind="{ $attrs }"
    :show="visible"
    title="asd"
    show-cancel-button
  >
    <div class="test">asd</div>
  </van-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    visible: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
