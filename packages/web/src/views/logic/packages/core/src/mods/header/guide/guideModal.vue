<template>
<el-dialog
      width="1000px"
      :visible="visible"
      title="帮助文档"
      :before-close="onClose"
    >
      <div class="guideContainer">
        <el-tabs tab-position="left" v-model="activeTab">
          <el-tab-pane class="tabPane" label="简单上手" name="1">
            <QuickStart />
          </el-tab-pane>
          <el-tab-pane class="tabPane" label="创建节点" name="2">
            <CreateNode />
          </el-tab-pane>
          <el-tab-pane class="tabPane" label="节点类型" name="3">
            <NodeType />
          </el-tab-pane>
          <el-tab-pane class="tabPane" label="配置节点" name="4">
            <ConfigNode />
          </el-tab-pane>
          <el-tab-pane class="tabPane" label="节点代码规范" name="5">
            <CodeStyle />
          </el-tab-pane>
          <el-tab-pane class="tabPane" label="节点间数据通信" name="6">
            <NodeConnect />
          </el-tab-pane>
          <el-tab-pane class="tabPane" label="如何在项目中使用" name="7">
            <HowToUse />
          </el-tab-pane>
          <el-tab-pane class="tabPane" label="文档汇总" name="8">
            <Document />
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-dialog>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
import QuickStart from './contents/QuickStart';
import CreateNode from './contents/CreateNode';
import NodeType from './contents/NodeType';
import ConfigNode from './contents/ConfigNode';
import CodeStyle from './contents/CodeStyle';
import NodeConnect from './contents/NodeConnect';
import HowToUse from './contents/HowToUse';
import Document from './contents/Document';

export default {
  components: {
    QuickStart,
    CreateNode,
    NodeType,
    ConfigNode,
    CodeStyle,
    NodeConnect,
    HowToUse,
    Document
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      activeTab: '1'
    }
  },
  methods: {
    onClose() {
      this.$emit('close', false);
    }
  }
}
</script>