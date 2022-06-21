<template>
  <makeBtnWidget tooltip="撤销" :handler="shortcuts.undo.handler" :flowChart="flowChart" :disabled="() => disabled(flowChart)">
    <template #icon>
      <i class="icon-sam icon-sam-undo" />
    </template>
  </makeBtnWidget>
</template>

<script>
  import {
    Graph
  } from '@antv/x6';
  import shortcuts from '../../../common/shortcuts';
  import makeBtnWidget from './common/makeBtnWidget';

  export default {
    name: 'LogicFlowToolBarUndo',
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
        return flowChart && !flowChart.canUndo();
      }
    }
  }
</script>