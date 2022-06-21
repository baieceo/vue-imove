<template>
  <div class="box" v-bind="$props">
    <svg :width="z(40)" :height="z(30)" xmlns:v-bind="http://www.w3.org/1999/xlink">
      <polygon :points="`0,${z(15)} ${z(20)},0 ${z(40)},${z(15)} ${z(20)},${z(30)}`" :style="{
            fill: '#FFF6D1',
            stroke: '#FFB96B',
            strokeWidth: 2,
          }" />
    </svg>
    <span class="text">{{title}}</span>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
export default {
    name: 'LogicFlowPreviewCellBranch',
    props: {
      title: {
        type: String,
        default: '判断'
      }
    },
    methods: {
      z(n) {
        return n * 1.2;
      }
    }
  }
</script>