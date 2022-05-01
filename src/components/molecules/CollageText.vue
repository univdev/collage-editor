<template>
  <div
    class="collage-text"
    ref="container"
    :style="style"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @mousemove="onMove"
  >
    <atom-input
      :value="value"
      @input="onInput"
      @type="onType"
    ></atom-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AtomInput from '@/components/atoms/Input.vue';

export type AlignType = 'left' | 'right' | 'center';
export type PositionType = [number, number];

export default defineComponent({
  components: {
    AtomInput,
  },
  emits: ['input', 'update:x', 'update:y'],
  props: {
    value: {
      type: String as PropType<string>,
      required: false,
      default: null,
    },
    align: {
      type: String as PropType<AlignType>,
      required: false,
      default: 'left',
    },
    size: {
      type: Number as PropType<number>,
      required: false,
      default: 24,
    },
    color: {
      type: String as PropType<string>,
      required: false,
      default: '#FFFFFF',
    },
    font: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    style() {
      const { width, font, size } = this;
      let left = 0;
      if (this.align === 'center') left = width / 2;
      return {
        marginLeft: `-${left}px`,
        fontFamily: font,
        fontSize: `${size}px`
      };
    },
  },
  data() {
    return {
      width: 0,
      startPosition: [0, 0] as PositionType,
    };
  },
  methods: {
    getWidth(): number {
      const container: HTMLElement = this.$refs.container as HTMLElement;
      return container.offsetWidth;
    },
    onInput(value: string) {
      this.$emit('input', value);
    },
    onType() {
      this.width = this.getWidth();
    },
  },
  mounted() {
    this.width = this.getWidth();
  },
});
</script>
