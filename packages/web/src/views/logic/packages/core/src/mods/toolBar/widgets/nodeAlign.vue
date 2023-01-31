<template>
  <makeDropdownWidget tooltip="对齐" :handler="handler" :disabled="() => disabled(flowChart)" :flowChart="flowChart">
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
    getSelectedNodes,
  } from '../../../utils/flowChartUtils';
  import makeDropdownWidget from './common/makeDropdownWidget';

  const ALIGN_MAP = {
    left: {
      text: '左对齐',
      icon: 'icon-sam icon-sam-align_to_left',
      handler(selectedNodes) {
        let minLeftValue = Infinity;
        selectedNodes.forEach((node) => {
          const {
            x
          } = node.getProp('position');
          if (x < minLeftValue) {
            minLeftValue = x;
          }
        });
        selectedNodes.forEach((node) =>
          node.setProp({
            position: {
              x: minLeftValue
            }
          }),
        );
      },
    },
    horizontalCenter: {
      text: '水平居中',
      icon: 'icon-sam icon-sam-align_to_center',
      handler(selectedNodes) {
        let minLeftValue = Infinity;
        let maxRightValue = -Infinity;
        selectedNodes.forEach((node) => {
          const {
            x
          } = node.getProp('position');
          const {
            width
          } = node.getProp(
            'size',
          );
          if (x < minLeftValue) {
            minLeftValue = x;
          }
          if (x + width > maxRightValue) {
            maxRightValue = x + width;
          }
        });
        const centerValue = (minLeftValue + maxRightValue) / 2;
        selectedNodes.forEach((node) => {
          const {
            width
          } = node.getProp(
            'size',
          );
          node.setProp({
            position: {
              x: centerValue - width / 2
            }
          });
        });
      },
    },
    right: {
      text: '右对齐',
      icon: 'icon-sam icon-sam-align_to_right',
      handler(selectedNodes) {
        let maxRightValue = -Infinity;
        selectedNodes.forEach((node) => {
          const {
            x
          } = node.getProp('position');
          const {
            width
          } = node.getProp(
            'size',
          );
          if (x + width > maxRightValue) {
            maxRightValue = x + width;
          }
        });
        selectedNodes.forEach((node) => {
          const {
            width
          } = node.getProp(
            'size',
          );
          node.setProp({
            position: {
              x: maxRightValue - width
            }
          });
        });
      },
    },
    top: {
      text: '顶部对齐',
      icon: 'icon-sam icon-sam-align_to_top',
      handler(selectedNodes) {
        let minTopValue = Infinity;
        selectedNodes.forEach((node) => {
          const {
            y
          } = node.getProp('position');
          if (y < minTopValue) {
            minTopValue = y;
          }
        });
        selectedNodes.forEach((node) =>
          node.setProp({
            position: {
              y: minTopValue
            }
          }),
        );
      },
    },
    verticalCenter: {
      text: '垂直居中',
      icon: 'icon-sam icon-sam-align_to_middle',
      handler(selectedNodes) {
        let minTopValue = Infinity;
        let maxBottomValue = -Infinity;
        selectedNodes.forEach((node) => {
          const {
            y
          } = node.getProp('position');
          const {
            height
          } = node.getProp(
            'size',
          );
          if (y < minTopValue) {
            minTopValue = y;
          }
          if (y + height > maxBottomValue) {
            maxBottomValue = y + height;
          }
        });
        const centerValue = (minTopValue + maxBottomValue) / 2;
        selectedNodes.forEach((node) => {
          const {
            height
          } = node.getProp(
            'size',
          );
          node.setProp({
            position: {
              y: centerValue - height / 2
            }
          });
        });
      },
    },
    bottom: {
      text: '底部对齐',
      icon: 'icon-sam icon-sam-align_to_bottom',
      handler(selectedNodes) {
        let maxTopValue = -Infinity;
        selectedNodes.forEach((node) => {
          const {
            y
          } = node.getProp('position');
          const {
            height
          } = node.getProp(
            'size',
          );
          if (y + height > maxTopValue) {
            maxTopValue = y + height;
          }
        });
        selectedNodes.forEach((node) => {
          const {
            height
          } = node.getProp(
            'size',
          );
          node.setProp({
            position: {
              y: maxTopValue - height
            }
          });
        });
      },
    },
  };

  export default {
    name: 'LogicFlowToolBarNodeAlign',
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
      getIcon() {
        return ALIGN_MAP['left'].icon;
      },
      handler(flowChart, value) {
        const selectedNodes = getSelectedNodes(flowChart);

        ALIGN_MAP[value].handler(selectedNodes);
      },
      disabled(flowChart) {
        const selectedNodes = getSelectedNodes(flowChart);

        return selectedNodes.length < 2;
      }
    }
  }
</script>