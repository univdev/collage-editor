<style lang="less" scoped>
  .collage-editor {
    position: relative;
    overflow: hidden;
    .content {
      display: flex;
      justify-content: center;
      padding: 16px;
      .collage-generator {
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
        ref="generator"
        class="collage-generator"
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
import DownloadDialog from '@/components/molecules/DownloadDialog.vue';

type CollageEditorType = InstanceType<typeof CollageGenerator>;

export default defineComponent({
  emits: ['download', 'upload:image'],
  components: {
    AtomInput,
    ControlsHeader,
    CollageGenerator,
    DownloadDialog,
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
    generator(): CollageEditorType {
      return this.$refs.generator as CollageEditorType;
    },
  },
  data() {
    return {
      isVisibleDownloadDialog: false,
      selectedItem: null as (number | null),
    };
  },
  methods: {
    onDownload(e: Event, extension: string) {
      console.log(extension);
      const { generator } = this;
      const canvas = generator.context;
      const url = canvas?.toDataURL({
        format: extension,
      }) as string;
      const link = document.createElement('a');
      link.href = url;
      link.download = ['2020_summer', extension].join('.');
      link.click();
      link.remove();
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
