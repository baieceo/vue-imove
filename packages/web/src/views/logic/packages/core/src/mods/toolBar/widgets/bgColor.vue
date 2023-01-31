<template>
  <makeBtnWidget tooltip="填充颜色" :handler="handler" :disabled="() => disabled(flowChart)" :flowChart="flowChart">
    <template #icon>
      <span class="verticalMiddleContainer">
        <i class="icon-sam icon-sam-line-paintyouqitong" style="margin-right: 4px;" />
        <el-color-picker :value="getCurBgColor(flowChart)" @change="onChangeComplete" size="mini"
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
    name: 'LogicFlowToolBarBgColor',
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
      getCurBgColor(flowChart) {
        let bgColor = '#DDD';

        const nodes = getSelectedNodes(flowChart);

        if (!this.disabled(flowChart) && nodes.length > 0) {
          bgColor = safeGet(nodes, '0.attrs.body.fill', '#575757');
        }

        return bgColor;
      },
      handler(flowChart, value) {
        return flowChart
          .getSelectedCells()
          .forEach((node) => node.setAttrs({
            body: {
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