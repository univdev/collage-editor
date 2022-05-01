<style scoped>

</style>

<template>
  <div class="app">
    <loading-overlay
      :visible="isLoading"
    ></loading-overlay>
    <collage-editor
      v-if="!isLoading"
      :items="canvas.elements"
      :canvas-width="canvas.width"
      :canvas-height="canvas.height"
      :canvas-background-images="canvas.backgrounds"
      @download="onDownload"
    ></collage-editor>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Element } from '@/types/canvas';
import CollageEditor from '@/components/templates/CollageEditor.vue';
import BackgroundImage from '@/assets/images/background.png';
import ShadowImage from '@/assets/images/shadow.png';
import LoadingOverlay from '@/components/molecules/LoadingOverlay.vue';
import LeftFrameImage from '@/assets/images/image-area--left.png';
import RightFrameImage from '@/assets/images/image-area--right.png';
import Example01 from '@/assets/images/example01.jpg';
import Example02 from '@/assets/images/example02.jpg';

export default defineComponent({
  components: {
    CollageEditor,
    LoadingOverlay,
  },
  data() {
    const [width, height] = [335, 596];
    const [imageWidth, imageHeight] = [200, 240];
    return {
      isLoading: false,
      canvas: {
        width,
        height,
        backgrounds: [
          BackgroundImage,
          ShadowImage,
        ] as string[],
        elements: [
          {
            position: [width / 2, 80],
            type: 'text',
            content: '2020',
            size: 24,
            font: 'Amiri',
            level: 1,
            align: 'center',
            color: '#555151',
          },
          {
            position: [width / 2, 120],
            type: 'text',
            content: 'SUMMER',
            size: 48,
            font: 'Amiri',
            level: 1,
            align: 'center',
            color: '#555151',
          },
          {
            position: [0, height - imageHeight - 100],
            type: 'image',
            frame: LeftFrameImage,
            content: Example01,
            width: imageWidth,
            height: imageHeight,
            contentDegree: 10,
          },
          {
            position: [width - imageWidth, height - imageHeight],
            type: 'image',
            frame: RightFrameImage,
            content: Example02,
            width: imageWidth,
            height: imageHeight,
            contentDegree: -5,
          },
        ] as Element[],
      },
    };
  },
  methods: {
    onDownload(canvas: HTMLCanvasElement) {
      const url = canvas.toDataURL();
      const link = document.createElement('a');
      link.href = url;
      link.download = 'merged_image.png';
      link.click();
      link.remove();
    },
  },
});
</script>
