<template>
  <div class="modifyStatusContainer" v-if="status !== statusCodeMap.pending">
    <span :style="{ color }">{{text}}</span>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';

  const statusCodeMap = {
    pending: 0,
    syncing: 1,
    successful: 2,
    failed: 3,
  };

  const statusMap = {
    [statusCodeMap.pending]: {
      color: '',
      text: '',
    },
    [statusCodeMap.syncing]: {
      color: '#999',
      text: '正在保存...',
    },
    [statusCodeMap.successful]: {
      color: '#999',
      text: '所有更改已保存',
    },
    [statusCodeMap.failed]: {
      color: '#EC5B56',
      text: '同步失败，进入离线模式',
    },
  };

  export default {
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        status: statusCodeMap.pending,
        statusCodeMap
      }
    },
    computed: {
      color() {
        const {
          color
        } = statusMap[this.status];

        return color;
      },
      text() {
        const {
          text
        } = statusMap[this.status];

        return text;
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.flowChart.on('graph:change:modify', () => {
          this.status = statusCodeMap.syncing;
        });

        this.flowChart.on('graph:modified', (res) => {
          const {
            success
          } = res;

          if (success) {
            this.status = statusCodeMap.successful;
          } else {
            this.status = statusCodeMap.failed;
          }
        });
      });
    },
    beforeDestroy() {
      this.flowChart.off('graph:change:modify');
      this.flowChart.off('graph:modified');
    }
  }
</script>