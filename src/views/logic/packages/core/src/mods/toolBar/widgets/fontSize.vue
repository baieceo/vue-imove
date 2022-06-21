<template>
  <makeDropdownWidget tooltip="字号" :handler="handler" :disabled="() => disabled(flowChart)" :flowChart="flowChart">
    <template #icon>
      <span>{{getIcon(flowChart)}}</span>
    </template>
    <el-dropdown-item v-for="(item, index) in FONT_SIZE_SET" :key="index" :command="item">{{item}}px
    </el-dropdown-item>
  </makeDropdownWidget>
</template>

<script>
  import {
    Graph
  } from '@antv/x6';
  import {
    safeGet
  } from '../../../utils';
  import makeDropdownWidget from './common/makeDropdownWidget';

  const FONT_SIZE_SET = [9, 10, 11, 12, 13, 14, 15, 16, 19, 22, 24, 29, 32];

  export default {
    name: 'LogicFlowToolBarFontSize',
    components: {
      makeDropdownWidget
    },
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        FONT_SIZE_SET
      };
    },
    methods: {
      getIcon(flowChart) {
        let fontSize = 14;

        const cells = flowChart.getSelectedCells();

        if (cells.length > 0) {
          fontSize = safeGet(cells, '0.attrs.label.fontSize', 14);
        }

        return `${fontSize}px`;
      },
      disabled(flowChart) {
        return flowChart.getSelectedCellCount() === 0;
      },
      handler(flowChart, value) {
        flowChart
          .getSelectedCells()
          .forEach((cell) => cell.setAttrs({
            label: {
              fontSize: value
            }
          }));
      }
    },
  }
</script>