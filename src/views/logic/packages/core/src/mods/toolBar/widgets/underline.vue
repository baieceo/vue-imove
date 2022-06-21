<template>
  <makeBtnWidget tooltip="下划线" :handler="shortcuts.underline.handler" :flowChart="flowChart"
    :disabled="() => disabled(flowChart)" :selected="() => selected(flowChart)">
    <template #icon>
      <i class="icon-sam icon-sam-xiahuaxian" />
    </template>
  </makeBtnWidget>
</template>

<script>
  import {
    Graph
  } from '@antv/x6';
  import {
    safeGet
  } from '../../../utils';
  import shortcuts from '../../../common/shortcuts';
  import makeBtnWidget from './common/makeBtnWidget';

  export default {
    name: 'LogicFlowToolBarUnderline',
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
        return flowChart.getSelectedCellCount() === 0;
      },
      selected(flowChart) {
        const cells = flowChart.getSelectedCells();
        if (cells.length > 0) {
          return (
            safeGet(cells, '0.attrs.label.textDecoration', 'none') === 'underline'
          );
        } else {
          return false;
        }
      }
    }
  }
</script>