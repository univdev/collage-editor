<style lang="less" scoped>
  .movable-controller {
    position: absolute;
    .handle {
      border-radius: 50%;
      width: 20px;
      height: 20px;
      background-color: #EEE;
      border: 2px solid skyblue;
      position: absolute;
      left: -5px;
      top: -5px;
      z-index: 10;
      cursor: grab;
    }
    &--active {
      border: 1px dotted black;
      z-index: 10000 !important;
      cursor: move;
    }
  }
</style>

<template>
  <div
    :class="{ 'movable-controller': true, 'movable-controller--active': isActive }"
    :style="style"
    @click="onClick"
    @mouseup="onMouseUp"
    @mousedown="onMousedown"
    @mouseleave="onMouseLeave"
    @mousemove="onMove"
  >
    <div
      v-if="isActive"
      class="handle"
      @mousedown.stop.prevent="onMousedownHandle"
      @mouseup.stop.prevent="onMouseupHandle"
      @mousemove.stop.prevent="onMousemoveHandle"
    ></div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  emits: ['move'],
  props: {
    x: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
    y: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
    level: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
    rotate: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
  },
  computed: {
    style() {
      return {
        left: `${this.x}px`,
        top: `${this.y}px`,
        zIndex: this.level,
      };
    },
  },
  data() {
    return {
      isActive: false,
      isDrag: false,
      isRotate: false,
      start: [0, 0] as [number, number],
      startRotatePosition: [0, 0] as [number, number],
    };
  },
  methods: {
    onClick(e: MouseEvent) {
      this.isActive = true;
    },
    onMousedownHandle(e: MouseEvent) {
      this.isRotate = true;
      this.startRotatePosition = [e.offsetX, e.offsetY];
    },
    onMouseupHandle() {
      this.isRotate = false;
    },
    onMousemoveHandle(e: MouseEvent) {
      const [x, y] = [e.offsetX, e.offsetY];
      const result = [this.startRotatePosition[0] - x, this.startRotatePosition[1] - y];
      console.log(result);
    },
    onMousedown(e: MouseEvent) {
      const { offsetX, offsetY } = e;
      this.isDrag = true;
      this.start = [offsetX, offsetY];
    },
    onMouseUp() {
      this.isDrag = false;
    },
    onMove(e: MouseEvent) {
      if (!this.isActive || !this.isDrag) return;
      const { offsetX, offsetY } = e;
      const [x, y] = this.start;
      const movement = [x - offsetX, y - offsetY];
      const result = [
        this.x - movement[0],
        this.y - movement[1],
      ];
      this.$emit('move', result);
    },
  },
});
</script>

