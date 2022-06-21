<template>
  <div ref="logic-flow-code-editor-container" :class="['logic-flow-code-editor-container', customClass]"></div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import * as monaco from 'monaco-editor';

  const KeyMod = {};
  const KeyCode = {};

  const CODE_EDITOR_OPTIONS = {
    fontSize: 14,
  };

  const defaultOptions = {
    // 语言
    language: 'javascript',
    // 主题
    theme: 'vs-dark',
    // 缩进
    tabSize: 2,
    // 只读
    readOnly: false,
    // 滚到最下面
    scrollBeyondLastLine: false,
    // 自动布局
    automaticLayout: false,
    // 自动缩进
    autoIndent: true,
  };

  export default {
    props: {
      customClass: String,
      // 配置
      options: {
        type: Object,
        default () {
          return {
            // 语言
            language: 'javascript',
            // 主题
            theme: 'vs-dark',
            // 缩进
            tabSize: 2,
            // 只读
            readOnly: false,
            // 滚到最下面
            scrollBeyondLastLine: false,
            // 自动布局
            automaticLayout: false
          };
        }
      },
      editorDidMount: {
        type: Function
      },
      value: {
        type: String
      }
    },
    data() {
      return {
        editor: null
      }
    },
    computed: {
      editorOptions() {
        return Object.assign({}, CODE_EDITOR_OPTIONS, defaultOptions, this.options);
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.editor = monaco.editor.create(this.$refs['logic-flow-code-editor-container'], {
          ...this.editorOptions,
          value: this.value,
        });

        // 监听内容变化
        this.editor.onDidChangeModelContent(this.onDidChangeModelContent);

        this.editor.addCommand(KeyMod.CtrlCmd | KeyCode.KEY_S, () => {
          this.$emit('save', this.editor.getValue());
        });

        this.$emit('editor-did-mount', this.editor.getValue(), this.editor);
      },
      onDidChangeModelContent() {
        this.emitValue();
      },
      // 自动格式化代码
      format() {
        this.editor.trigger('anything', 'editor.action.formatDocument');

        this.emitValue();
      },
      emitValue() {
        this.$emit('change', this.editor.getValue());
      },
      destroy() {
        this.editor.dispose()
      },
      // 改变编辑器值
      setValue(value) {
        this.editor.setValue(value);
      },
      // 获取编辑器值
      getValue() {
        return this.editor.getValue();
      },
    }
  }
</script>