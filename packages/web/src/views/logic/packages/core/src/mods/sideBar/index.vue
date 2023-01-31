<template>
  <div class="container">
    <el-collapse class="collapse" v-model="defaultActiveKey">
      <el-collapse-item v-for="group in groups" :title="group.name" :name="group.key" :key="group.key">
        <PanelContent :dnd="dnd(flowChart)" :cellTypes="group.cellTypes" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph,
    Addon
  } from '@antv/x6';
  import {
    install as previewCellInstall
  } from '../../common/previewCell';
  import PanelContent from './PanelContent';

  const {
    Dnd
  } = Addon;

  const GENERAL_GROUP = {
    key: 'general',
    name: '通用元件',
    cellTypes: ['imove-start', 'imove-branch', 'imove-behavior'],
  };

  previewCellInstall();

  export default {
    components: {
      PanelContent
    },
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        groups: [],
        defaultActiveKey: ['general', 'custom']
      };
    },
    mounted() {
      this.groups = [GENERAL_GROUP];
    },
    methods: {
      dnd(flowChart) {
        return new Dnd({
          target: flowChart,
          scaled: true
        });
      }
    }
  }
</script>