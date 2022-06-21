<template>
  <el-tooltip :content="tooltip" placement="top">
    <div :class="iconWrapperCls" @click="($event) => onClick($event)">
      <div class="btn-icon">
        <slot name="icon" />
      </div>

      <div class="btn-content">
        <slot />
      </div>
    </div>
  </el-tooltip>
</template>

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
      iconClass: {
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
      selected: {
        type: [Function, Boolean],
        default () {
          return false;
        }
      }
    },
    computed: {
      iconWrapperCls() {
        const iconWrapperCls = [styles.btnWidget];

        if (this.privateDisabled) {
          iconWrapperCls.push(styles.disabled);
        }

        if (this.privateSelected) {
          iconWrapperCls.push(styles.selected);
        }

        return iconWrapperCls;
      },
      privateDisabled() {
        if (typeof this.disabled === 'function') {
          return this.disabled(this.flowChart);
        }

        return this.disabled;
      },
      privateSelected() {
        if (typeof this.selected === 'function') {
          return this.selected(this.flowChart);
        }

        return this.selected;
      }
    },
    methods: {
      onClick() {
        if (this.privateDisabled) return;

        this.handler(this.flowChart);

        this.flowChart.trigger('toolBar:forceUpdate');
      }
    }
  }
</script>