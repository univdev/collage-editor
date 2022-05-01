<style lang="less" scoped>
  .generator {
    border: 1px solid #EEE;
  }
</style>

<template>
  <canvas
    ref="generator"
    class="generator"
    :width="width"
    :height="height"
  ></canvas>
  <input
    accept="image/*"
    type="file"
    ref="uploader"
    hidden
    @change="onUploadImage"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { fabric } from 'fabric';
import FontFaceObserver from 'fontfaceobserver';
import { Text, Image, Element as CanvasElement } from '@/types/canvas';

export default defineComponent({
  props: {
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
    backgrounds: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
    items: {
      type: Array as PropType<CanvasElement[]>,
      required: false,
      default: () => [],
    },
  },
  computed: {
    generator(): HTMLCanvasElement {
      return this.$refs.generator as HTMLCanvasElement;
    },
    sortedItems() {
      return [...this.items].sort((a: CanvasElement, b: CanvasElement) => {
        return a.level < b.level ? 1 : -1;
      });
    },
  },
  data() {
    return {
      context: null as fabric.Canvas | null,
      objects: [] as any[],
      selectedGroup: null as fabric.Group | null,
    };
  },
  watch: {
    sortedItems(items: CanvasElement[]) {
      this.renderObjects(items);
    },
  },
  methods: {
    createBackgroundImage(images: HTMLImageElement[]): HTMLCanvasElement {
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      const context: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
      context.globalCompositeOperation = 'multiply';
      for (const image of images) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height); 
      }
      return canvas;
    },
    initialize() {
      return new Promise((resolve) => {
        const { generator } = this;
        const canvas = new fabric.Canvas(generator);
        canvas.setDimensions({
          width: this.width * window.devicePixelRatio,
          height: this.height * window.devicePixelRatio,
        });
        canvas.setZoom(window.devicePixelRatio);
        this.context = canvas;
        this.preloadImages(this.backgrounds).then((images: fabric.Image[]) => {
          const imgs: HTMLImageElement[] = [...images].map((image) => image.getElement() as HTMLImageElement);
          const background = this.createBackgroundImage(imgs);
          this.preloadImage(background.toDataURL()).then((image) => {
            canvas.setBackgroundImage(image, () => {
              resolve(image);
            });
            canvas.renderAll();
          });
        });
      });
    },
    renderObjects(items: CanvasElement[]) {
      const result = [] as any[];
      for (const item of items) {
        if (item.type === 'image') result.push(this.renderImage(item as Image));
        if (item.type === 'text') result.push(this.renderText(item as Text));
      }
      return Promise.all(result).then((items: any) => {
        this.context?.add(...items);
      });
    },
    renderImage(item: Image): Promise<fabric.Group> {
      return new Promise((resolve, reject) => {
        const { width, height, position, frame, content, contentDegree } = item;
        const [x, y] = position;
        const resources: string[] = [];
        if (frame) resources.push(frame as string);
        if (content) resources.push(content as string);
        return this.preloadImages(resources).then(([f, img]) => {
          const elements = [];
          f.scaleToWidth(width);
          f.scaleToWidth(height);
          f.left = x;
          f.top = y;
          elements.push(f);
          if (img) {
            img.scaleToWidth(172);
            img.scaleToHeight(216);
            img.left = x + 40;
            img.top = y + 40;
            img.rotate(contentDegree);
            elements.push(img);
          }
          const group = new fabric.Group(elements);
          group.selectable = true;
          resolve(group);
        });
      });
    },
    renderText(item: Text): Promise<fabric.IText> {
      const font = new FontFaceObserver(item.font);
      return new Promise((resolve) => {
        font.load().then(() => {
          const [x, y] = item.position;
          const text = new fabric.IText(item.content);
          text.set({
            fontFamily: item.font,
            left: x,
            top: y,
            fontSize: item.size,
            textAlign: item.align,
            fill: item.color,
            originX: 'center',
            centeredScaling: true,
            editable: true,
          });
          resolve(text);
        });
      });
    },
    preloadImage(path: string): Promise<fabric.Image> {
      return new Promise((resolve, reject) => {
        fabric.Image.fromURL(path, (image) => {
          resolve(image);
        });
      });
    },
    preloadImages(paths: string[]) {
      return Promise.all(paths.map((path: string) => this.preloadImage(path)));
    },
    getGroup(objects: fabric.Object[], options?: fabric.IGroupOptions, isAlreadyGrouped?: boolean) {
      return new fabric.Group(objects, options, isAlreadyGrouped);
    },
    onSelectText(target: fabric.IText) {
      target.enterEditing();
    },
    onSelectImage(target: fabric.Group) {
      this.selectedGroup = target;
      this.onVisibleUploader();
    },
    onVisibleUploader() {
      const uploader: HTMLInputElement = this.$refs.uploader as HTMLInputElement;
      uploader.click();
    },
    onUploadImage(e: InputEvent) {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      const files: FileList = target.files as FileList;
      const file: File = files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      this.preloadImage(url).then((image) => {
        const [frame, content] = this.selectedGroup?.getObjects() as fabric.Image[];
        content.clone((clone: fabric.Image) => {
          clone.setSrc(image.getSrc());
          image.scaleToWidth(172);
          image.scaleToHeight(216);
          image.width = 1000;
          image.height = 1500;
          this.selectedGroup?.add(clone);
          this.selectedGroup?.remove(content);
          this.context?.requestRenderAll();
        });
      });
      target.value = '';
    },
  },
  mounted() {
    this.initialize().then(() => {
      this.renderObjects(this.sortedItems).then(() => {
        this.context?.on('mouse:dblclick', ({ target }) => {
          if (target?.type === 'i-text') this.onSelectText(target as fabric.IText);
          if (target?.type === 'group') this.onSelectImage(target as fabric.Group);
        });
      });
    });
  },
});
</script>
