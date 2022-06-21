<template>
  <el-tooltip :content="tooltip" placement="top">
    <el-dropdown :disabled="privateDisabled" @command="onChange" trigger="click">
      <div :class="iconWrapperCls">
        <slot name="icon" />

        <i class="caret el-icon-caret-bottom" v-if="!hideArrow" />
      </div>

      <el-dropdown-menu slot="dropdown">
        <slot />
      </el-dropdown-menu>

      <slot name="dropdown" />
    </el-dropdown>
  </el-tooltip>
</template>

<style lang="scss" scoped>
  @import '../index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';
  import styles from '../index.module.scss';

  export default {
    props: {
      flowChart: {
        type: Graph
      },
      tooltip: {
        type: String,
        default: ''
      },
      handler: {
        type: Function,
        default () {
          return () => {};
        }
      },
      disabled: {
        type: [Function, Boolean],
        default () {
          return false;
        }
      },
      hideArrow: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      privateDisabled() {
        if (typeof this.disabled === 'function') {
          return this.disabled(this.flowChart);
        }

        return this.disabled;
      },
      iconWrapperCls() {
        const iconWrapperCls = [styles.btnWidget];

        if (this.privateDisabled) {
          iconWrapperCls.push(styles.disabled);
        }

        return iconWrapperCls;
      }
    },
    methods: {
      onChange(data) {
        if (this.privateDisabled) return;

        this.handler(this.flowChart, data);

        this.flowChart.trigger('toolBar:forceUpdate');
      }
    }
  }
</script>