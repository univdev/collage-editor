<style lang="less" scoped>
  .header-bar {
    width: 100%;
    height: 60px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EEE;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

<template>
    <header-bar>
      <atom-button
        type="success"
        icon="printer"
        @click="onClickDownloadButton"
      >
        다운로드
      </atom-button>
    </header-bar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AtomButton from '@/components/atoms/Button.vue';
import HeaderBar from '@/components/molecules/HeaderBar.vue';

export default defineComponent({
  emits: ['download'],
  components: {
    AtomButton,
    HeaderBar,
  },
  props: {
    downloadButtonText: {
      type: String as PropType<string>,
      required: false,
      default: '다운로드',
    },
  },
  methods: {
    onClickDownloadButton(e: MouseEvent) {
      this.$emit('download', e);
    },
  },
});
</script>
