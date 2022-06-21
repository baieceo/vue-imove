<template>
  <makeBtnWidget tooltip="置于顶层" :handler="shortcuts.bringToTop.handler"
    :flowChart="flowChart" :disabled="() => disabled(flowChart)">
    <template #icon>
      <i class="icon-sam icon-sam-bringtotop" />
    </template>
  </makeBtnWidget>
</template>

<script>
  import {
    Graph
  } from '@antv/x6';
  import shortcuts from '../../../common/shortcuts';
  import makeBtnWidget from './common/makeBtnWidget';
  import {
    hasNodeSelected
  } from '../../../utils/flowChartUtils';

  export default {
    name: 'LogicFlowToolBarBringToTop',
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
        shortcuts
      };
    },
    methods: {
      disabled(flowChart) {
        return !hasNodeSelected(flowChart);
      },
    }
  }
</script>