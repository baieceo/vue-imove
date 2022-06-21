<template>
  <makeBtnWidget tooltip="边框颜色" :handler="handler" :disabled="() => disabled(flowChart)" :flowChart="flowChart">
    <template #icon>
      <span class="verticalMiddleContainer">
        <i class="fa fa-pencil" style="margin-right: 4px;" />
        <el-color-picker :value="getCurBorderColor(flowChart)" @change="onChangeComplete" size="mini"
          :disabled="disabled(flowChart)">
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
    name: 'LogicFlowToolBarBorderColor',
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
      getCurBorderColor(flowChart) {
        let borderColor = '#DDD';
        const nodes = getSelectedNodes(flowChart);
        if (!this.disabled(flowChart) && nodes.length > 0) {
          borderColor = safeGet(nodes, '0.attrs.body.stroke', '#333');
        }
        return borderColor;
      },
      handler(flowChart, value) {
        return flowChart
          .getSelectedCells()
          .forEach((node) => node.setAttrs({
            body: {
              stroke: value
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