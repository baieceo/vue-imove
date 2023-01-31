<template>
  <div class="container" ref="wrapperRef">
    <div class="flowChart" ref="graphRef" />
    <div class="miniMap" ref="miniMapRef" />

    <template v-if="flowChart">
      <CodeRunModal :flowChart="flowChart" />
      <CodeEditorModal :flowChart="flowChart" />
      <FlowChartContextMenu v-bind="contextMenuInfo" :flowChart="flowChart" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    queryGraph
  } from '../../api';
  import {
    parseQuery
  } from '../../utils';
  import createFlowChart from './createFlowChart';
  import CodeRunModal from './codeRunModal';
  import CodeEditorModal from './codeEditorModal';
  import FlowChartContextMenu from './contextMenu';

  const defaultMenuInfo = {
    x: 0,
    y: 0,
    scene: 'blank',
    visible: false,
  };

  export default {
    components: {
      CodeRunModal,
      CodeEditorModal,
      FlowChartContextMenu
    },
    props: {
      onReady: {
        type: Function,
        default () {
          return () => {};
        }
      },
      queryGraphMethod: {
        type: Function
      },
      modifyGraphMethod: {
        type: Function
      }
    },
    data() {
      return {
        flowChart: null,
        contextMenuInfo: defaultMenuInfo
      }
    },
    mounted() {
      if (this.$refs['graphRef'] && this.$refs['wrapperRef']) {
        const flowChart = createFlowChart(this.$refs['graphRef'], this.$refs['wrapperRef'], this.modifyGraphMethod);

        flowChart.on('graph:showContextMenu', this.flowChartShowHandler);
        flowChart.on('graph:hideContextMenu', this.flowChartHideHandler);

        this.flowChart = flowChart;

        this.fetchData(flowChart);

        this.$emit('ready', flowChart);

        this.$nextTick(this.flowChartResizeHandler);

        window.addEventListener('resize', this.flowChartResizeHandler);
      }
    },
    beforeDestroy() {
      if (this.flowChart) {
        this.flowChart.off('graph:showContextMenu', this.flowChartShowHandler);
        this.flowChart.off('graph:hideContextMenu', this.flowChartHideHandler);
      }

      window.removeEventListener('resize', this.flowChartResizeHandler);
    },
    methods: {
      fetchData(flowChart) {
        const {
          projectId
        } = parseQuery();

        (this.queryGraphMethod || queryGraph)(projectId)
          .then((res) => {
            const {
              data: dsl
            } = res;

            flowChart.fromJSON(dsl);
          })
          .catch((error) => {
            console.log('query graph data failed, the error is:', error);
          });
      },
      flowChartShowHandler(info) {
        if (this.flowChart) {
          this.flowChart.lockScroller();
        }

        this.contextMenuInfo = {
          ...info,
          visible: true
        }
      },
      flowChartHideHandler() {
        if (this.flowChart) {
          this.flowChart.unlockScroller();
        }

        this.contextMenuInfo = {
          ...this.contextMenuInfo,
          visible: false
        }
      },
      flowChartResizeHandler() {
        requestAnimationFrame(() => {
          if (this.flowChart && this.$refs['wrapperRef']) {
            const width = this.$refs['wrapperRef'].clientWidth;
            const height = this.$refs['wrapperRef'].clientHeight;

            this.flowChart.resize(width, height);
          }
        });
      }
    }
  }
</script>