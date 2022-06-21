<template>
  <el-tabs type="card" v-model="activeKey">
    <el-tab-pane class="tabPane" label="可视化模式" name="visualTab">
      <VisualPanel :data="data" @change="onVisualChange" />
    </el-tab-pane>
    <el-tab-pane class="tabPane" label="源码模式" name="jsonTab">
      <CodeEditor ref="CodeRunInputCodeEditor" :options="{ language: 'json' }" :value="JSON.stringify(data, null, 2)"
        @change="onEditorChange" />
    </el-tab-pane>
  </el-tabs>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import VisualPanel from './VisualPanel';
  import CodeEditor from '../../codeEditor';

  export default {
    components: {
      VisualPanel,
      CodeEditor
    },
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        activeKey: 'visualTab'
      };
    },
    methods: {
      onVisualChange(newForm) {
        this.$refs['CodeRunInputCodeEditor'].setValue(JSON.stringify(newForm, null, 2));

        this.$emit('change', newForm);
      },
      onEditorChange(newCode = '') {
        try {
          this.$emit('change', JSON.parse(newCode));
        } catch (err) {
          // cancel log to avoid wasting Console outputs
        }
      },
    },
    watch: {
      activeKey(activeKey) {
        this.$nextTick(() => {
          if (activeKey === 'jsonTab') {
            this.$refs['CodeRunInputCodeEditor'].destroy();
            this.$refs['CodeRunInputCodeEditor'].init();
          }
        });

      }
    }
  }
</script>