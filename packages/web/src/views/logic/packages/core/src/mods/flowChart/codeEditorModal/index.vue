<template>
  <el-dialog class="modal" custom-class="modal" width="1000px" :title="title" :visible="visible" :before-close="onCancel">
    <CodeEditor v-if="visible" :value="code" width="100%" height="600px" @change="onChangeCode" />

    <span slot="footer" class="dialog-footer">
      <el-button size="mini"  key="cancel" @click="onCancel">
        取消
      </el-button>
      <el-button size="mini"  key="runCode" type="primary" plain @click="onRunCode">
        运行代码
      </el-button>
      <el-button size="mini"  key="saveCode" type="primary" @click="onOk">
        保存
      </el-button>
    </span>
  </el-dialog>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';
  import JsonView from 'vue-json-viewer';
  import {
    safeParse
  } from '../../../utils';
  import analyzeDeps from '../../../utils/analyzeDeps';
  import CodeEditor from '../../../components/codeEditor';

  export default {
    components: {
      // eslint-disable-next-line vue/no-unused-components
      JsonView,
      CodeEditor
    },
    props: {
      title: {
        type: String,
        default: '编辑代码'
      },
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        code: '',
        visible: false
      };
    },
    created() {
      this.flowChart.on('graph:editCode', this.handler);
    },
    beforeDestroy() {
      this.flowChart.off('graph:editCode', this.handler);
    },
    methods: {
      handler() {
        this.visible = true;
      },
      onOk() {
        this.visible = false;

        this.updateNodeCode(this.code);
      },
      onCancel() {
        this.visible = false;
      },
      onRunCode() {
        this.updateNodeCode(this.code);

        this.flowChart.trigger('graph:runCode');
      },
      onChangeCode(newCode = '') {
        this.code = newCode;
      },
      updateNodeCode(code) {
        const cell = this.flowChart.getSelectedCells()[0];
        const {
          code: oldCode,
          dependencies
        } = cell.getData();

        if (code === oldCode) {
          return;
        }

        cell.setData({
          code
        });

        this.$message.success('代码保存成功', 1);

        const excludeDeps = safeParse(dependencies);

        analyzeDeps(code, Object.keys(excludeDeps)).then((deps) => {
          if (Object.keys(deps).length > 0) {
            const h = this.$createElement;

            this.$msgbox({
              type: 'info',
              title: '检测到您的代码有新依赖，已为您自动更新',
              message: h('div', {
                class: 'depsInfoModalContent'
              }, [h('json-view', {
                props: {
                  name: 'dependencies',
                  value: deps
                }
              })])
            }).then(action => {
              if (action === 'confirm') {
                const newDeps = {
                  ...excludeDeps,
                  ...deps
                };
                cell.setData({
                  code,
                  dependencies: JSON.stringify(newDeps, null, 2),
                });
                // NOTE: notify basic panel to update dependency
                this.flowChart.trigger('settingBar.basicPanel:forceUpdate');
              }
            });
          }
        });
      }
    },
    watch: {
      visible(visible) {
        if (visible) {
          const cell = this.flowChart.getSelectedCells()[0];
          const {
            code
          } = cell.getData() || {};

          this.code = code;
        } else {
          this.code = '';
        }
      }
    }
  }
</script>