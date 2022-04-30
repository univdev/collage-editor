<style scoped>

</style>

<template>
  <div class="app">
    <collage-editor
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
import LeftFrameImage from '@/assets/images/image-area--left.png';
import RightFrameImage from '@/assets/images/image-area--right.png';

export default defineComponent({
  components: {
    CollageEditor,
  },
  data() {
    const [width, height] = [335, 596];
    const [imageWidth, imageHeight] = [200, 260];
    return {
      canvas: {
        width,
        height,
        backgrounds: [
          BackgroundImage,
          ShadowImage,
        ] as string[],
        elements: [{
          position: [0, height - (imageHeight * 1.2)],
          type: 'image',
          frame: LeftFrameImage,
          level: 4,
          width: imageWidth,
          height: imageHeight,
        },
        {
          position: [
            width - imageWidth,
            height - imageHeight + (imageHeight / 8),
          ],
          type: 'image',
          frame: RightFrameImage,
          level: 3,
          width: imageWidth,
          height: imageHeight,
        }] as Element[],
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
