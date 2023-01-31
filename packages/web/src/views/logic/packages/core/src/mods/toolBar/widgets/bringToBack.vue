<template>
  <makeBtnWidget tooltip="置于底层" :handler="shortcuts.bringToBack.handler" :flowChart="flowChart"
    :disabled="() => disabled(flowChart)">
    <template #icon>
      <i class="icon-sam icon-sam-bringtobottom" />
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
    name: 'LogicFlowToolBarBringToBack',
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