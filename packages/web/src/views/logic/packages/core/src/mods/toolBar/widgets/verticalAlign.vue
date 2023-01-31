<template>
  <makeDropdownWidget tooltip="垂直对齐" :handler="handler" :disabled="() => disabled(flowChart)" :flowChart="flowChart">
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
    top: {
      text: '上对齐',
      icon: 'icon-sam icon-sam-vertical-align-top',
      attrs: {
        refY: 0,
        refY2: 10,
        textVerticalAlign: 'start',
        align: {
          vertical: 'top',
        },
      },
    },
    center: {
      text: '居中对齐',
      icon: 'icon-sam icon-sam-vertical-align-middl',
      attrs: {
        refY: 0.5,
        refY2: 0,
        textVerticalAlign: 'middle',
        align: {
          vertical: 'center',
        },
      },
    },
    bottom: {
      text: '下对齐',
      icon: 'icon-sam icon-sam-vertical-align-botto',
      attrs: {
        refY: 0.99,
        refY2: -10,
        textVerticalAlign: 'end',
        align: {
          vertical: 'bottom',
        },
      },
    },
  };

  export default {
    name: 'LogicFlowToolBarVerticalAlign',
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
          alignType = safeGet(nodes, '0.attrs.label.align.vertical', 'center');
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