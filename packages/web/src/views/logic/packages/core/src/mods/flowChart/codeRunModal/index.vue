<template>
  <el-dialog class="modal" width="1000px" :title="title" :visible="visible" :before-close="onClose">
    <CodeRun v-if="visible" :flowChart="flowChart" />
  </el-dialog>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';
  import CodeRun from '../../../components/codeRun';

  export default {
    components: {
      CodeRun
    },
    props: {
      title: {
        type: String,
        default: '执行代码'
      },
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        visible: false
      };
    },
    created() {
      this.flowChart.on('graph:runCode', this.handler);
    },
    beforeDestroy() {
      this.flowChart.off('graph:runCode', this.handler);
    },
    methods: {
      handler() {
        this.visible = true;
      },
      // events
      onClose() {
        this.visible = false;
      }
    },
    flowChart: {
      handler() {
        // this.flowChart.on('graph:runCode', this.handler);
      }
    }
  }
</script>