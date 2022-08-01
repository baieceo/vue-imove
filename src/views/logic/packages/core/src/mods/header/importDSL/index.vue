<template>
  <el-upload class="container" accept=".json" :disabled="disabled" :show-file-list="false" action=""
    :before-upload="beforeUpload">
    <el-tooltip effect="dark" content="导入DSL" placement="top">
      <el-button type="text" icon="icon-sam icon-sam-daoru" size="mini"></el-button>
    </el-tooltip>
  </el-upload>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';

  export default {
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        disabled: false
      };
    },
    methods: {
      beforeUpload(file) {
        this.disabled = true;
        const reader = new FileReader();
        reader.onload = (evt) => {
          this.disabled = false;
          if (!evt.target) {
            this.$message.error('加载文件失败!');
          } else {
            const dsl = evt.target.result;
            try {
              this.flowChart.fromJSON(JSON.parse(dsl));
            } catch (err) {
              this.$message.error('DSL解析失败!');
            }
          }
        };
        reader.readAsText(file);
        return false;
      }
    }
  }
</script>


import { Button, Upload, message } from 'antd';


const ImportDSL: React.FC<IProps> = (props) => {
  const { flowChart } = props;
  const [disabled, setDisabled] = useState(false);
  const beforeUpload = (file: any) => {

  };

  return (

  );
  };

  export default ImportDSL;