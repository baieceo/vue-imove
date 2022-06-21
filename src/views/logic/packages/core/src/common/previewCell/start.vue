<template>
  <div class="box" v-bind="$props">
    <div class="circle">
      <span class="text">{{title}}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
export default {
    name: 'LogicFlowPreviewCellStart',
    props: {
      title: {
        type: String,
        default: '开始'
      }
    }
  }
</script>