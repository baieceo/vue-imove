<template>
  <makeDropdownWidget tooltip="水平对齐" :handler="handler" :disabled="() => disabled(flowChart)" :flowChart="flowChart">
    <template #icon>
      <span class="verticalMiddleContainer"><i :class="getIcon(flowChart)" /></span>
    </template>
    <el-dropdown-item v-for="(alignItem, alignType) in ALIGN_MAP" :key="alignType" :command="alignType">
      <i :class="alignItem.icon" />
      <span>{{alignItem.text}}</span>
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
    hasNodeSelected,
    getSelectedNodes,
  } from '../../../utils/flowChartUtils';
  import makeDropdownWidget from './common/makeDropdownWidget';

  const ALIGN_MAP = {
    left: {
      text: '左对齐',
      icon: 'icon-sam icon-sam-align-left',
      attrs: {
        refX: 0,
        refX2: 5,
        textAnchor: 'start',
        align: {
          horizontal: 'left',
        },
      },
    },
    center: {
      text: '居中对齐',
      icon: 'icon-sam icon-sam-align-center',
      attrs: {
        refX: 0.5,
        refX2: 0,
        textAnchor: 'middle',
        align: {
          horizontal: 'center',
        },
      },
    },
    right: {
      text: '右对齐',
      icon: 'icon-sam icon-sam-align-right',
      attrs: {
        refX: 0.99,
        refX2: -5,
        textAnchor: 'end',
        align: {
          horizontal: 'right',
        },
      },
    },
  };

  export default {
    name: 'LogicFlowToolBarHorizontalAlign',
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
        ALIGN_MAP
      };
    },
    methods: {
      getIcon(flowChart) {
        let alignType = 'center';

        const nodes = getSelectedNodes(flowChart);

        if (nodes.length > 0) {
          alignType = safeGet(nodes, '0.attrs.label.align.horizontal', 'center');
        }

        return ALIGN_MAP[alignType].icon;
      },
      handler(flowChart, value) {
        const label = ALIGN_MAP[value].attrs;

        getSelectedNodes(flowChart).forEach((node) =>
          node.setAttrs({
            label
          }),
        );
      },
      disabled(flowChart) {
        return !hasNodeSelected(flowChart);
      }
    }
  }
</script>