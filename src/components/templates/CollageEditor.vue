<style lang="less" scoped>
  .collage-editor {
    position: relative;
    overflow: hidden;
    .content {
      display: flex;
      justify-content: center;
      padding: 16px;
      .collage-creator {
        display: inline-block;
        margin: auto;
      }
    }
  }
</style>

<template>
  <div class="collage-editor">
    <controls-header
      @download="onDownload"
    />
    <div class="content">
      <collage-generator
        ref="creator"
        class="collage-creator"
        :items="items"
        :width="canvasWidth"
        :height="canvasHeight"
        :backgrounds="canvasBackgroundImages"
        @click:image="onClickImage"
        @drag:image="onDrag"
        @drop:image="onDrop"
      ></collage-generator>
    </div>
    <input
      ref="uploader"
      type="file"
      accept="image/*"
      hidden
      @change="onUploadImage"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Element } from '@/types/canvas';
import AtomInput from '@/components/atoms/Input.vue';
import ControlsHeader from '@/components/organisms/ControlsHeader.vue';
import CollageGenerator from '@/components/organisms/CollageGenerator.vue';

type CollageEditorType = InstanceType<typeof CollageGenerator>;

export default defineComponent({
  components: {
    AtomInput,
    ControlsHeader,
    CollageGenerator,
  },
  props: {
    items: {
      type: Array as PropType<Element[]>,
      required: false,
      default: () => [],
    },
    canvasBackgroundImages: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
    canvasWidth: {
      type: Number as PropType<number>,
      required: false,
      default: 335,
    },
    canvasHeight: {
      type: Number as PropType<number>,
      required: false,
      default: 596,
    },
  },
  computed: {
    creator(): CollageEditorType {
      return this.$refs.creator as CollageEditorType;
    },
  },
  data() {
    return {
      selectedItem: null as (number | null),
    };
  },
  methods: {
    onClickImage(item: Element, key: number) {
      const uploader: HTMLInputElement = this.$refs.uploader as HTMLInputElement;
      uploader.click();
      this.selectedItem = key;
      this.$emit('click:image', item, key);
    },
    onDownload() {
      const creator: CollageEditorType = this.creator;
      const canvas: HTMLCanvasElement = creator.getMergedCanvas();
      this.$emit('download', canvas);
    },
    onDrag(event: DragEvent, item: Element, key: number) {
      this.$emit('drag:image', event, item, key);
    },
    onDrop(event: DragEvent, item: Element, key: number) {
      this.$emit('drop:image', event, item, key);
    },
    onUploadImage(event: InputEvent) {
      const target: HTMLInputElement = event.target as HTMLInputElement;
      const files = target ? target.files : null;
      const file = files && files[0];
      const url = URL.createObjectURL(file);
      if (!file) return;
      this.$emit('upload:image', event, file, url, this.selectedItem);
      target.value = '';
    },
  },
});
</script>
