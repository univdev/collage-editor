<style lang="less" scoped>
</style>

<template>
  <div
    ref="input"
    v-bind="{ ...$attrs, ...$props }"
    v-html="value"
    class="input"
    :contenteditable="isEditable"
    @click="onClick"
    @blur="onBlur"
    @input="onInput"
  >
  </div>
</template>

<script lang="ts">
export default {
  name: 'AtomInput',
  emits: ['input', 'blur', 'type'],
  props: {
    value: {
      type: String,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      isEditable: false,
    };
  },
  watch: {
    isEditable(flag) {
      const input: HTMLElement = this.$refs.input as HTMLElement;
      if (flag) input.focus();
    },
  },
  methods: {
    onClick() {
      this.isEditable = true;
    },
    onBlur(e: Event) {
      this.isEditable = false;
      const target: HTMLElement = e.target as HTMLElement;
      this.$emit('input', target.innerHTML);
      this.$emit('blur', e);
    },
    onInput() {
      this.$emit('type');
    },
  },
};
</script>
