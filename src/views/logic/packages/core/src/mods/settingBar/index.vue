<template>
  <div class="container-wrapper">
    <template v-if="nodes.length === 1">
      <div class="container">
        <el-tabs value="basic" stretch>
          <el-tab-pane label="节点配置" name="basic">
            <Basic :selectedCell="selectedCell" :flowChart="flowChart" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
    <template v-else>
      <div class="container center">
        <el-empty description="请选择一个节点" />
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';
  import Basic from './mods/basic';

  export default {
    components: {
      Basic
    },
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        nodes: this.getNodes()
      };
    },
    computed: {
      selectedCell() {
        return this.nodes[0];
      }
    },
    created() {
      this.flowChart.on('settingBar:forceUpdate', this.forceUpdate);
    },
    beforeDestroy() {
      this.flowChart.off('settingBar:forceUpdate');
    },
    methods: {
      getNodes() {
        let nodes = [];

        if (this.flowChart) {
          nodes = this.flowChart.getSelectedCells().filter((v) => v.shape !== 'edge');
        }

        return nodes;
      },
      forceUpdate() {
        this.nodes = this.getNodes();

        /* const forceUpdate = (children) => {
          children.forEach(child => {
            if (child.$children && child.$children.length) {
              forceUpdate(child.$children);
            }

            child.$forceUpdate();

            if (child.forceUpdate) {
              child.forceUpdate();
            }
          });
        };

        forceUpdate(this.$children); */
      }
    }
  }
</script>