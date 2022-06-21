<template>
  <div style="text-align: right;">
    <el-button @click="toCopySchema">复制Schema</el-button>
    <el-button @click="toCopy">复制代码</el-button>
    <el-button type="primary" @click="$emit('toPlayground')">
      在 Playground 页验证
    </el-button>
    <JsonPrettyPrint :json-string="genCode"></JsonPrettyPrint>
  </div>
</template>

<script>
import JsonPrettyPrint from '../../../../demo-common/components/JsonPerttyPrint.vue';

// 拷贝到剪贴板
export function clip2board(value, callback) {
    const input = document.createElement('textarea');
    document.body.appendChild(input);

    input.value = value;
    input.select();

    if (document.execCommand('copy')) {
        document.execCommand('copy');

        typeof callback === 'function' && callback(null, value);
    } else {
        typeof callback === 'function' &&
            callback(new TypeError('document.execCommand is not a function'));
    }

    document.body.removeChild(input);
}

export default {
  name: 'ExportSchemaView',
  components: {
    JsonPrettyPrint,
  },
  props: {
    genCode: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      genType: 1,
    };
  },
  methods: {
    toCopy() {
      if (this.copied) {
        return;
      }
      const pre = this.$el.querySelectorAll('pre')[0];
      pre.setAttribute('contenteditable', 'true');
      pre.focus();
      document.execCommand('selectAll', false, null);
      this.copied = document.execCommand('copy');
      pre.removeAttribute('contenteditable');
      setTimeout(() => {
        this.copied = false;
        this.$message.success('复制成功');
      }, 300);
    },
    toCopySchema() {
      const code = JSON.stringify(this.genCode.schema, null, 4);

      clip2board(code);

      setTimeout(() => {
        this.copied = false;
        this.$message.success('复制Schema成功');
      }, 300);
    },
  },
};
</script>
