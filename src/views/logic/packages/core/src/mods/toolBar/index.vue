<template>
  <div class="container">
    <div v-for="(group, index) in widgets" :key="index" class="group">
      <component v-for="(ToolItem, ToolItemIndex) in group" :key="ToolItemIndex" :flowChart="flowChart"
        :is="ToolItem.name" />
    </div>
    <ModifyStatus :flowChart="flowChart" />
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';
  import widgets from './widgets';
  import ModifyStatus from './widgets/modifyStatus';

  export default {
    components: {
      ModifyStatus
    },
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        widgets
      }
    },
    mounted() {
      this.flowChart.on('toolBar:forceUpdate', this.forceUpdate);
    },
    beforeDestroy() {
      this.flowChart.off('toolBar:forceUpdate');
    },
    methods: {
      async forceUpdate() {
        this.$children.forEach(child => {
          child.$forceUpdate();
        });
      }
    }
  }
</script>