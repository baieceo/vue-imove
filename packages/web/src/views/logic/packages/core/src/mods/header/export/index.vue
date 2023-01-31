<template>
  <div class="container">
    <el-tooltip effect="dark" content="导出" placement="top">
      <el-button type="text" icon="icon-sam icon-sam-daochu" size="mini" @click="onOpenModal"></el-button>
    </el-tooltip>
    <ExportModal :flowChart="flowChart" :visible="modalVisible" @close="onCloseModal" />
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';
  import ExportModal from './exportModal';

  export default {
    components: {
      ExportModal
    },
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        modalVisible: false
      }
    },
    methods: {
      onOpenModal() {
        this.modalVisible = true;
      },
      onCloseModal() {
        this.modalVisible = false;
      }
    }
  }
</script>