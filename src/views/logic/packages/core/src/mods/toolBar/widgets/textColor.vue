<template>
  <makeBtnWidget tooltip="文本颜色" :handler="handler" :disabled="() => disabled(flowChart)" :flowChart="flowChart">
    <template #icon>
      <span class="verticalMiddleContainer">
        <i class="icon-sam icon-sam-zitiyanse" style="margin-right: 4px;" />
        <el-color-picker :value="getCurTextColor(flowChart)" @change="onChangeComplete" size="mini" :disabled="disabled(flowChart)">
        </el-color-picker>
      </span>
    </template>
  </makeBtnWidget>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';
  import {
    safeGet
  } from '../../../utils';
  import {
    hasNodeSelected,
    getSelectedNodes,
  } from '../../../utils/flowChartUtils';
  import makeBtnWidget from './common/makeBtnWidget';

  export default {
    name: 'LogicFlowToolBarTextColor',
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
      getCurTextColor(flowChart) {
        let textColor = '#DDD';

        const nodes = getSelectedNodes(flowChart);

        if (nodes.length > 0) {
          textColor = safeGet(nodes, '0.attrs.label.fill', '#575757');
        }

        return textColor;
      },
      handler(flowChart, value) {
        return flowChart
          .getSelectedCells()
          .forEach((node) => node.setAttrs({
            label: {
              fill: value
            }
          }));
      },
      disabled(flowChart) {
        return !hasNodeSelected(flowChart);
      },
      onChangeComplete(color) {
        this.handler(this.flowChart, color);

        this.flowChart.trigger('toolBar:forceUpdate');
      }
    }
  }
</script>