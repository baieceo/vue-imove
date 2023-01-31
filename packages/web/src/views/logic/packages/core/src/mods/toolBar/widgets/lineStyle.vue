<template>
  <makeDropdownWidget tooltip="线条样式" :handler="handler" :disabled="() => disabled(flowChart)" :flowChart="flowChart">
    <template #icon>
      <span class="verticalMiddleContainer"><i :class="getIcon(flowChart)" /></span>
    </template>
    <el-dropdown-item v-for="(lineItem, lineType) in LINE_STYLE_MAP" :key="lineType" :command="lineType">
      <i :class="lineItem.icon" />
      <span>{{lineItem.text}}</span>
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
  import {
    hasEdgeSelected,
    getSelectedEdges,
  } from '../../../utils/flowChartUtils';
  import makeDropdownWidget from './common/makeDropdownWidget';

  const LINE_STYLE_MAP = {
    straight: {
      text: '直线',
      icon: 'el-icon-minus',
      attrs: {
        type: 'straight',
        strokeDasharray: '5, 0',
      },
    },
    dashed: {
      text: '虚线',
      icon: 'el-icon-more',
      attrs: {
        type: 'dashed',
        strokeDasharray: '5, 5',
      },
    },
  };

  export default {
    name: 'LogicFlowToolBarLineStyle',
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
        LINE_STYLE_MAP
      };
    },
    methods: {
      getIcon(flowChart) {
        let lineType = 'straight';

        const edges = getSelectedEdges(flowChart);

        if (edges.length > 0) {
          lineType = safeGet(edges, '0.attrs.line.type', 'straight');
        }

        return LINE_STYLE_MAP[lineType].icon;
      },
      handler(flowChart, value) {
        const line = LINE_STYLE_MAP[value].attrs;

        getSelectedEdges(flowChart).forEach((edge) =>
          edge.setAttrs({
            line
          }),
        );
      },
      disabled(flowChart) {
        return !hasEdgeSelected(flowChart);
      }
    }
  }
</script>