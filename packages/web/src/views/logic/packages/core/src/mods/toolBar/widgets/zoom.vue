<template>
  <div class="zoomContainer">
    <makeBtnWidget tooltip="缩小" :handler="shortcuts.zoomOut.handler" :flowChart="flowChart" :disabled="() => zoomOutDisabled(flowChart)">
      <template #icon>
        <i class="icon-sam icon-sam-zoomout" />
      </template>
    </makeBtnWidget>
    <span class="zoomText">{{Helper.scaleFormatter(scale)}}</span>
    <makeBtnWidget tooltip="放大" :handler="shortcuts.zoomIn.handler" :flowChart="flowChart" :disabled="() => zoomInDisabled(flowChart)">
      <template #icon>
        <i class="icon-sam icon-sam-zoomin" />
      </template>
    </makeBtnWidget>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';
  import shortcuts from '../../../common/shortcuts';
  import makeBtnWidget from './common/makeBtnWidget';

  const MIN_ZOOM = 0.5;
  const MAX_ZOOM = 1.5;

  const Helper = {
    scaleFormatter(scale) {
      return (scale * 100).toFixed(0) + '%';
    },
  };

  export default {
    name: 'LogicFlowToolBarZoom',
    components: {
      makeBtnWidget
    },
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        shortcuts,
        scale: this.flowChart.zoom(),
        Helper,
        MIN_ZOOM,
        MAX_ZOOM
      };
    },
    created() {
      this.flowChart.on('scale', () => {
        this.scale = this.flowChart.zoom();
      });
    },
    methods: {
      disabled(flowChart) {
        return flowChart && !flowChart.canUndo();
      },

      zoomOutDisabled(flowChart) {
        return flowChart.zoom() <= MIN_ZOOM;
      },

      zoomInDisabled(flowChart) {
        return flowChart.zoom() >= MAX_ZOOM;
      }
    }
  }
</script>