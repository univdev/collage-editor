<template>
  <van-button
    v-bind="{ ...$attrs, ...$props }"
    class="button"
    @click="onClick"
  >
    <slot></slot>
  </van-button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AtomButton',
  props: {
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      required: false,
      default: null,
    },
    icon: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
  },
  methods: {
    onClick(e: Event) {
      this.$emit('click', e);
    },
  },
});
</script>
