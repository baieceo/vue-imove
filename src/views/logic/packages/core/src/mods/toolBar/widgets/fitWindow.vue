<template>
  <makeBtnWidget tooltip="适配窗口" :handler="handler" :flowChart="flowChart">
    <template #icon>
      <i class="icon-sam icon-sam-chuangkouhua-03" />
    </template>
  </makeBtnWidget>
</template>

<script>
  import {
    Graph
  } from '@antv/x6';
  import makeBtnWidget from './common/makeBtnWidget';

  export default {
    name: 'LogicFlowToolBarFitWindow',
    components: {
      makeBtnWidget
    },
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {};
    },
    methods: {
      handler(flowChart) {
        flowChart.zoomToFit({
          minScale: 0.5,
          maxScale: 1
        });
      }
    }
  }
</script>