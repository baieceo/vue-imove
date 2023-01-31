<template>
  <div class="box" v-bind="$props">
    <div class="rect">
      <span class="text">{{title}}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
export default {
    name: 'LogicFlowPreviewCellBehavior',
    props: {
      title: {
        type: String,
        default: '处理'
      }
    }
  }
</script>