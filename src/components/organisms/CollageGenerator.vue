<style lang="less" scoped>
  .collage-canvas {
    position: relative;
    overflow: hidden;
    .collage-image {
      position: absolute;
    }
    .canvas {
      position: relative;
      z-index: 2;
      display: inline-block;
      border: 1px solid #EEE;
      &.canvas--background {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1;
      }
    }
  }
</style>

<template>
  <div
    class="collage-canvas"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
    }"
  >
    <template
      v-for="(item, key) in items"
    >
      <collage-image
        v-if="item.type === 'image'"
        class="collage-image"
        :key="key"
        :style="{ zIndex: item.level, left: `${item.position[0]}px`, top: `${item.position[1]}px` }"
        :content-degree="item.contentDegree"
        :width="item.width"
        :height="item.height"
        :degree="item.degree"
        :image="item.content"
        :background="item.frame"
        :padding="item.padding"
        @click="onClickItem(item, key)"
        @drag="onDrag($event, item, key)"
        @drop="onDrop($event, drop, key)"
      ></collage-image>
    </template>
    <canvas
      ref="paint"
      class="canvas"
      :width="width"
      :height="height"
      @click="onClickCanvas"
    ></canvas>
    <canvas
      ref="background"
      class="canvas canvas--background"
      :width="width"
      :height="height"
    ></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { Element, Image as ImageType } from '@/types/canvas';
import CollageImage from '@/components/molecules/CollageImage.vue';

export default defineComponent({
  components: {
    CollageImage,
  },
  props: {
    items: {
      type: Array as PropType<Element[]>,
      required: false,
      default: () => [],
    },
    backgrounds: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
    width: {
      type: Number as PropType<number>,
      required: false,
      default: 350,
    },
    height: {
      type: Number as PropType<number>,
      required: false,
      default: 590,
    },
  },
  computed: {
    paintCanvas() {
      return this.$refs.paint as HTMLCanvasElement;
    },
    backgroundCanvas() {
      return this.$refs.background as HTMLCanvasElement;
    },
    sortedItems(): Element[] {
      return [...this.items].sort((a: any, b: any) => {
        return a?.level > b?.level ? 1 : -1;
      });
    },
  },
  data() {
    return {
      backgroundImages: [] as HTMLImageElement[],
      itemImages: [] as ImageType[],
    };
  },
  watch: {
    backgroundImages(images: HTMLImageElement[]) {
      this.renderBackgrounds(this.backgroundCanvas, images);
    },
  },
  methods: {
    initializeCanvas(elements: HTMLCanvasElement[]) {
      for (const canvas of elements) {
        this.canvasScaleUp(canvas);
      }
    },
    canvasScaleUp(canvas: HTMLCanvasElement) {
      const [width, height] = [canvas.width, canvas.height];
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    },
    getMergedCanvas(): HTMLCanvasElement {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const [width, height] = [this.getScaleUpSize(this.width), this.getScaleUpSize(this.height)];
      context?.drawImage(this.backgroundCanvas, 0, 0, width, height);
      context?.drawImage(this.paintCanvas, 0, 0, width, height);
      return canvas;
    },
    getScaleUpSize(size: number) {
      return size * window.devicePixelRatio;
    },
    renderBackground(canvas: HTMLCanvasElement, image: HTMLImageElement) {
      const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
      context.globalCompositeOperation = 'multiply';
      const [width, height] = [this.getScaleUpSize(canvas.width), this.getScaleUpSize(canvas.height)];
      context.drawImage(image, 0, 0, width, height);
    },
    renderBackgrounds(canvas: HTMLCanvasElement, images: HTMLImageElement[]) {
      for (const image of images) this.renderBackground(canvas, image);
    },
    loadImage(path: string) {
      return new Promise<HTMLImageElement>((resolve, reject) => {
        try {
          const image = new Image();
          image.src = path;
          image.onload = () => {
            resolve(image);
          };
        } catch (error) {
          reject(error);
        }
      });
    },
    loadImages(paths: string[]) {
      return Promise.all<HTMLImageElement>([...paths].map((path) => this.loadImage(path)));
    },
    onClickCanvas(e: any) {
      const { layerX: x, layerY: y } = e;
      console.log(x, y);
    },
    onClickItem(item: Element, key: number) {
      this.$emit('click:image', item, key);
    },
    onDrag(event: DragEvent, item: Element, key: number) {
      this.$emit('drag:image', event, item, key);
    },
    onDrop(event: DragEvent, item: Element, key: number) {
      this.$emit('drop:image', event, item, key);
    },
    onGetBackgroundImages(backgrounds: string[]) {
      this.loadImages(backgrounds).then((images) => {
        this.backgroundImages = images;
      });
    },
  },
  mounted() {
    this.onGetBackgroundImages(this.backgrounds);
    this.initializeCanvas([this.paintCanvas, this.backgroundCanvas]);
  },
});
</script>
