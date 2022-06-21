<template>
  <makeBtnWidget tooltip="重做" :handler="shortcuts.redo.handler" :flowChart="flowChart" :disabled="() => disabled(flowChart)">
    <template #icon>
      <i class="icon-sam icon-sam-redo" />
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
    name: 'LogicFlowToolBarRedo',
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
        return !flowChart.canRedo();
      }
    }
  }
</script>