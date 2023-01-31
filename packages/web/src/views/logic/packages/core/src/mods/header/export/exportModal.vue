<template>
  <el-dialog width="700px" :visible="visible" title="导出" :before-close="onClose">
    <div class="modalContent">
      <div class="downloadWrap" @click="onExportDSL">
        <img class="picPreview"
          src="//img.alicdn.com/imgextra/i2/O1CN01lvanDL1YKp54hGgMS_!!6000000003041-2-tps-247-247.png" />
        <span>DSL</span>
      </div>
      <div class="downloadWrap" @click="onExportCode">
        <img class="picPreview"
          src="//img.alicdn.com/imgextra/i3/O1CN01V3wg6S27JuqePTXZv_!!6000000007777-2-tps-247-247.png" />
        <span>代码</span>
      </div>
      <div class="downloadWrap" @click="onExportFlowChart">
        <img class="picPreview"
          src="//img.alicdn.com/imgextra/i1/O1CN01sVItyC1exeLraUhf6_!!6000000003938-2-tps-247-247.png" />
        <span>流程图</span>
      </div>
    </div>

    <span slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onClose">取 消</el-button>
      <el-button size="mini" type="primary" @click="onClose">导 出</el-button>
    </span>
  </el-dialog>
</template>

<style lang="scss" scoped>
@import './index.module.scss';
</style>

<script>
  import JSZip from 'jszip';
  import {
    Graph,
    DataUri
  } from '@antv/x6';
  import {
    compileForProject
  } from '../../../../../compile-code/src/index';

  const Helper = {
    recursiveZip(root, json) {
      if (typeof json !== 'object' || json === null) {
        return;
      }
      for (const key in json) {
        const val = json[key];
        if (typeof val === 'string') {
          root.file(key, val);
        } else {
          const dir = root.folder(key);
          Helper.recursiveZip(dir, val);
        }
      }
    },
  };

  export default {
    props: {
      flowChart: {
        type: Graph
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onExportDSL() {
        const dsl = JSON.stringify(this.flowChart.toJSON(), null, 2);
        const blob = new Blob([dsl], {
          type: 'text/plain'
        });
        DataUri.downloadBlob(blob, 'imove.dsl.json');
      },
      onExportCode() {
        const zip = new JSZip();
        const dsl = this.flowChart.toJSON();
        const output = compileForProject(dsl);
        Helper.recursiveZip(zip, output);
        zip.generateAsync({
          type: 'blob'
        }).then((blob) => {
          DataUri.downloadBlob(blob, 'logic.zip');
        });
      },
      onExportFlowChart() {
        this.flowChart.toPNG(
          (dataUri) => {
            DataUri.downloadDataUri(dataUri, 'flowChart.png');
          }, {
            padding: 50,
            ratio: '3.0'
          },
        );
      },
      onClose() {
        this.$emit('close');
      }
    }
  }
</script>