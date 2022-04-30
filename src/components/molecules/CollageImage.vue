<style lang="less" scoped>
  .collage-image {
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    padding: 16px;
    .collage-image__content {
      width: 100%;
      height: 100%;
    }
  }
</style>

<template>
  <div
    class="collage-image"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      backgroundImage: `url(${background})`,
      transform: `rotate(${degree}deg)`,
    }"
    @click="onClick"
    @drag.prevent.stop="onDrag"
    @drop.prevent.stop="onDrop"
  >
    <img
      v-if="image"
      :src="image"
      class="collage-image__content"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    background: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
    image: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
    width: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
    height: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
    degree: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
    onDrag(e: DragEvent) {
      this.$emit('drag', e);
    },
    onDrop(e: DragEvent) {
      this.$emit('drop', e);
    },
  },
});
</script>
