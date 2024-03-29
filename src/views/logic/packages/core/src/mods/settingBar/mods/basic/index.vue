<template>
  <div class="container">
    <el-card>
      <div slot="header">名称</div>
      <Input name="label" :title="nodeTitle" :value="label" @value-change="onChangeLabel" />

      <template v-if="selectedCell.shape === 'imove-start'">
        <div class="input">
          <Input name="trigger" title="逻辑触发名称" :value="trigger" @value-change="onChangeTrigger" />
        </div>
      </template>
    </el-card>

    <template v-if="selectedCell.shape !== 'edge'">
      <Json name="dependencies" title="依赖" :value="dependencies" :isConfig="false"
        @value-change="onChangeDependencies" />
      <Json name="configSchema" title="投放配置" :selectedCell="selectedCell" :value="configSchema" :isConfig="true"
        @value-change="onChangeConfigSchema" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import Json from '../../components/json';
  import Input from '../../components/input';
  import {
    Cell,
    Graph
  } from '@antv/x6';

  export default {
    components: {
      Json,
      Input
    },
    props: {
      selectedCell: {
        type: Cell
      },
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        data: this.selectedCell.getData()
      }
    },
    computed: {
      label() {
        const {
          label
        } = this.data || {};

        if (this.selectedCell.shape === 'edge') {
          return this.selectedCell.getLabelAt(0) ? this.selectedCell.getLabelAt(0).attrs.label.text : '';
        }

        return label;
      },
      trigger() {
        const {
          trigger
        } = this.data || {};

        return trigger;
      },
      dependencies() {
        const {
          dependencies
        } = this.data || {};

        return dependencies;
      },
      configSchema() {
        const {
          configSchema
        } = this.data || {};

        return configSchema;
      },
      nodeTitle() {
        if (this.selectedCell.shape === 'edge') {
          return '标签显示名称';
        } else {
          return '节点显示名称';
        }
      }
    },
    created() {
      this.flowChart.on('settingBar.basicPanel:forceUpdate', this.handler);
    },
    beforeDestroy() {
      this.flowChart.off('settingBar.basicPanel:forceUpdate', this.handler);
    },
    methods: {
      handler() {
        this.data = this.selectedCell.getData();
      },
      // events
      batchUpdate(newData) {
        this.selectedCell.setData(newData);

        this.data = Object.assign({}, this.data, newData);
      },
      commonChange(key, val) {
        this.batchUpdate({
          [key]: val
        });
      },
      onChangeLabel(val) {
        if (this.selectedCell.shape === 'edge') {
          this.selectedCell.setLabelAt(0, val);
        } else {
          this.commonChange('label', val);

          this.selectedCell.setAttrs({
            label: {
              text: val
            }
          });
        }
      },
      onChangeConfigSchema(val) {
        this.commonChange('configSchema', val);
      },
      onChangeTrigger(val) {
        this.commonChange('trigger', val);
      },
      onChangeDependencies(val) {
        this.commonChange('dependencies', val);
      },
    },
    watch: {
      selectedCell: {
        handler(selectedCell) {
          this.data = selectedCell.getData();
        },
        // deep: true
        immediate: true
      }
    }
  }
</script>