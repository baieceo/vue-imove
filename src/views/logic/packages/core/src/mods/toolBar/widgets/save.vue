<template>
  <makeBtnWidget tooltip="保存" :handler="handler" :flowChart="flowChart">
    <template #icon>
      <i class="icon-sam icon-sam-baocun" />
    </template>
  </makeBtnWidget>
</template>

<script>
  import {
    Graph
  } from '@antv/x6';
  import shortcuts from '../../../common/shortcuts';
  import makeBtnWidget from './common/makeBtnWidget';

  export default {
    name: 'LogicFlowToolBarSave',
    components: {
      makeBtnWidget
    },
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        shortcuts
      };
    },
    methods: {
      handler(flowChart) {
        shortcuts.save.handler(flowChart);

        this.$message.success('保存成功');
      }
    }
  }
</script>