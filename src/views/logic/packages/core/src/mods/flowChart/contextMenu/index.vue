<template>
  <div v-if="visible" ref="menuRef" class="contextMenu" :style="{ left: x + 'px', top: y + 'px' }">
    <el-menu mode="vertical" @select="onClickMenu">
      <makeMenuContent :flowChart="flowChart" :menuConfig="menuConfig" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
  @import '../index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';
  import {
    nodeMenuConfig,
    blankMenuConfig
  } from './menuConfig';
  import makeMenuContent from './makeMenuContent';

  const menuConfigMap = {
    node: nodeMenuConfig,
    blank: blankMenuConfig,
  };

  export default {
    components: {
      makeMenuContent
    },
    props: {
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      },
      scene: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: false
      },
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {

      }
    },
    computed: {
      menuRef() {
        return this.$refs['menuRef'];
      },
      menuConfig() {
        return menuConfigMap[this.scene];
      }
    },
    methods: {
      makeMenuHandlerMap(config) {
        const queue = config.slice(0);
        const handlerMap = {};

        while (queue.length > 0) {
          const {
            key,
            handler,
            children
          } = queue.pop();

          if (children && children.length > 0) {
            queue.push(...children);
          } else {
            handlerMap[key] = handler;
          }
        }

        return handlerMap;
      },
      onClickMenu(index, key) {
        const handlerMap = this.makeMenuHandlerMap(this.menuConfig);

        const handler = handlerMap[key];

        if (handler) {
          this.onClickAway();

          handler(this.flowChart);
        }
      },
      onClickAway() {
        this.flowChart.trigger('graph:hideContextMenu');
      }
    }
  }
</script>