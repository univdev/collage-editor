<style scoped>

</style>

<template>
  <div class="app">
    <collage-editor
      v-model:items="canvas.elements"
      :canvas-width="canvas.width"
      :canvas-height="canvas.height"
      :canvas-background-images="canvas.backgrounds"
      @click:image="onClickImage"
      @download="onDownload"
      @upload:image="onUploadImage"
    ></collage-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Element, Image } from '@/types/canvas';
import Template from '@/data/template';
import CollageEditor from '@/components/templates/CollageEditor.vue';
import BackgroundImage from '@/assets/images/background.png';
import ShadowImage from '@/assets/images/shadow.png';

export default defineComponent({
  components: {
    CollageEditor,
  },
  data() {
    const [width, height] = [335, 596];
    return {
      canvas: {
        width,
        height,
        backgrounds: [
          BackgroundImage,
          ShadowImage,
        ] as string[],
        elements: [
          ...Template,
        ] as Element[],
      },
    };
  },
  methods: {
    setImageToElement(url: string, key: number) {
      const target: Image = this.canvas?.elements[key] as Image;
      if (!target) return;
      target.content = url;
    },
    onDownload(canvas: HTMLCanvasElement) {
      const url = canvas.toDataURL();
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged_image.png';
      link.click();
      link.remove();
    },
    onUploadImage(event: InputEvent, file: File, url: string, key: number) {
      this.setImageToElement(url, key);
    },
  },
});
</script>
