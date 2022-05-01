<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .dropdown-menu {
    /deep/ .van-dropdown-menu__bar {
      padding: 0 16px;
    }
  }
  .download-buton {
    margin-left: 16px;
  }
</style>

<template>
    <header-bar
      class="header"
    >
      <van-dropdown-menu
        class="dropdown-menu"
      >
        <van-dropdown-item
          class="dropdown-menu__item"
          v-model="downloadOption"
          :options="downloadOptions"
        />
      </van-dropdown-menu>
      <atom-button
        class="download-buton"
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
  data() {
    return {
      downloadOption: 'png',
      downloadOptions: [
        { text: 'PNG', value: 'png' },
        { text: 'JPG', value: 'jpg' },
      ],
    };
  },
  methods: {
    onClickDownloadButton(e: MouseEvent) {
      this.$emit('download', e, this.downloadOption);
    },
  },
});
</script>
