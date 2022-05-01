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
  emits: ['download', 'upload:image'],
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
    onDownload() {
      const { creator } = this;
      const canvas = creator.context;
      const link = canvas?.toDataURL({
        format: 'png',
      });
      this.$emit('download', link);
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
