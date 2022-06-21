<template>
  <div :class="$style.container">
    <div :class="$style['data-store']">
      <el-container>
        <el-header :class="$style['data-store-header']" height="40px">
          <h2>数据仓库</h2>
        </el-header>
        <el-container :class="$style['data-store-content']">
          <el-aside>
            <el-row :class="$style['data-store-types']" :gutter="5">
              <el-col :span="8" v-for="(item, index) in configTools" :key="index" style="margin-bottom: 5px;">
                <el-button @click="handleNodeAdd(item)" size="mini" style="width: 100%; padding-left: 5px;">
                  <i :class="getTypeIcon(item.componentPack.viewSchema.type)"></i><span
                    style="display: inline-block; width: 6em; text-align: left; padding-left: 5px;">{{ item.title }}</span>
                </el-button>
              </el-col>
            </el-row>
            <el-scrollbar style="flex: 1;">
              <div :class="$style['data-store-container']">
                <div class="data-store-tree-wrapper">
                  <el-tree node-key="id" default-expand-all :class="$style['data-store-tree-wrapper']"
                    :data="componentList" :props="{
            children: 'childList'
          }" :indent="0" :highlight-current="true" :expand-on-click-node="false" @node-click.self="handleNodeClick">
                    <span :class="$style['data-store-tree']" slot-scope="{ node, data }">
                      <i :class="[$style['data-store-tree-icon'], getTypeIcon(data.componentPack.viewSchema.type)]"></i>
                      <span
                        style="color: #666;">{{ data.componentValue.baseValue.schemaOptions.title || data.componentValue.property }}</span>
                      <el-popconfirm v-if="node.parent && data.componentValue.property !== 'root'"
                        title="确定删除吗？" @confirm="() => handleNodeRemove(node, data)">
                        <i slot="reference" class="el-icon-circle-close" style="margin-left: 5px;"></i>
                      </el-popconfirm>
                    </span>
                  </el-tree>

                </div>
              </div>
            </el-scrollbar>
          </el-aside>
          <el-main>
            <el-tabs v-model="activeName" :class="$style['data-store-tabs']">
              <el-tab-pane label="属性配置" name="compConfig">
                <el-scrollbar style="height: 100%;">
                  <div :class="$style['data-store-container']">
                    <el-empty v-if="!curEditorItem" description="请选择属性"></el-empty>
                    <VueJsonFrom v-else v-model="curEditorItem.componentValue" :class="$style.configForm"
                      :schema="curEditorItem.componentPack.propsSchema" :form-props="{
              labelPosition: 'right',
              labelWidth: '110px',
              size: 'mini'
            }" :form-footer="{
              show: false,
            }" />
                  </div>
                </el-scrollbar>
              </el-tab-pane>
              <el-tab-pane label="数据编辑" name="stateConfig">
                <el-scrollbar style="height: 100%;">
                  <div :class="$style['data-store-container']">
                    <template v-if="schema">
                      <VueJsonFrom v-model="state" :schema="stateSchema" :form-props="{
                        size: 'mini'
                      }" :form-footer="{show: false}" />
                    </template>
                  </div>
                </el-scrollbar>
              </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>
        <el-footer :class="$style['data-store-footer']" height="30">
          <el-row type="flex" justify="end">
            <el-button size="mini" @click="$emit('cancel')">取消</el-button>
            <el-button type="primary" size="mini" @click="handleSubmit">确定</el-button>
          </el-row>
        </el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
  import VueJsonFrom from '../../../lib/vue2/vue2-form-element/src/index';

  import dataStoreConfigTools from './config/data-store-tools';

  import {
    generateEditorItem,
    componentList2JsonSchema,
  } from './common/editorData';

  import jsonSchema2ComponentList from './common/jsonSchema2ComponentList';

  export default {
    name: 'DataStoreEditor',
    components: {
      VueJsonFrom,
    },
    props: {
      schema: Object,
      value: [Array, Object]
    },
    data() {
      return {
        configTools: dataStoreConfigTools,
        curEditorItem: null, // 选中的formItem
        componentList: [],
        state: this.value,
        stateSchema: {},
        activeName: 'compConfig',
        // activeName: 'stateConfig'
      };
    },
    methods: {
      getInitComponentList() {
        const rootData = generateEditorItem(dataStoreConfigTools.find(i => i.title === '对象'));

        rootData.id = 'root';
        rootData.title = '数据源';
        rootData.componentValue.property = 'root';
        rootData.componentValue.baseValue.schemaOptions.title = '数据源';

        return [rootData];
      },
      schema2componentList(schema) {
        const data = {
          schema
        };

        const result = jsonSchema2ComponentList(JSON.stringify(data), [{
          groupName: '组件列表',
          componentList: this.configTools
        }]);

        return result.componentList;
      },
      handleSubmit() {
        this.$emit('submit', {
          schema: componentList2JsonSchema(this.componentList),
          value: this.state
        });
      },
      getTypeIcon(type) {
        return {
          object: 'fa fa-cube',
          array: 'fa fa-list',
          string: 'fab fa-stripe-s',
          number: 'fas fa-infinity',
          boolean: 'fa fa-exclamation'
        } [type];
      },
      // 点击节点
      handleNodeClick(editorItem) {
        this.curEditorItem = editorItem;

        this.activeName = 'compConfig';
      },
      // 移除节点
      handleNodeRemove(node, data) {
        const parent = node.parent;
        const children = parent.data.childList || parent.data;
        const index = children.findIndex(d => d.id === data.id);

        children.splice(index, 1);

        this.$nextTick(() => {
          this.curEditorItem = null;
        });
      },
      // 添加组件
      handleNodeAdd(item) {
        const component = generateEditorItem(item);

        if (!this.curEditorItem && this.componentList[0] && this.componentList[0].childList) {
          this.componentList[0].childList.push(component);
        } else if (this.curEditorItem && this.curEditorItem.childList) {
          this.curEditorItem.childList.push(component);
        } else {
          this.componentList.push(component);
        }

        this.curEditorItem = component;
        this.activeName = 'compConfig';
      },
    },
    watch: {
      schema: {
        handler(value) {
          let componentList = [];

          if (value && JSON.stringify(value) !== '{}') {
            componentList = this.schema2componentList(value);
          } else {
            componentList = this.getInitComponentList();
          }

          this.componentList = [...componentList];
          this.stateSchema = componentList2JsonSchema(componentList);
        },
        deep: true,
        immediate: true
      },
      value: {
        handler(value) {
          this.state = value;
        },
        deep: true,
        immediate: true
      },
      componentList: {
        handler(value) {
          this.stateSchema = componentList2JsonSchema(value);
        },
        deep: true
      }
    }
  };
</script>

<style module>
  .data-store {
    overflow: hidden;
    background-color: #fff;
    border-right: 1px solid #f2f3f5;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }

  .data-store :global(.el-container) {
    height: 100%;
    overflow: hidden;
  }

  .data-store-header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #f2f3f5;
  }

  .data-store-header :global(.el-page-header__content) {
    font-size: 16px;
  }

  .data-store-content {
    display: flex;
    flex: 1;
  }

  .data-store-content :global(.el-aside) {
    display: flex;
    flex-direction: column;
    min-width: 350px;
    border-right: 1px solid #f2f3f5;
    overflow-x: hidden;
  }

  .data-store-content :global(.el-main) {
    flex: 1;
    padding: 0;
  }

  .data-store-content :global(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }

  .data-store-footer {
    border-top: 1px solid #f2f3f5;
    padding: 10px;
  }

  .data-store-types {
    padding: 10px 10px 5px;
    border-bottom: 1px solid #f2f3f5;
  }

  .data-store-types :global(.el-button-group) {
    width: 100%;
    display: flex;
  }

  .data-store-types :global(.el-button) {
    flex: 1;
  }

  .data-store-types-item {
    display: inline-block;
    color: #FFF;
    background-color: rgba(64, 158, 255, 1);
    cursor: pointer;
    padding: 7px 5px;
    font-size: 12px;
    border-radius: 3px;
    line-height: 1;
    margin: 0 5px 5px 0;
    min-width: 100px;
  }

  .data-store-types-item:hover {
    background-color: rgba(64, 158, 255, 0.8);
  }

  .data-store-types-item i {
    display: inline-block;
    margin-right: 5px;
  }

  .data-store-tabs {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .data-store-tabs :global(.el-tabs__content) {
    flex: 1;
  }

  .data-store-tabs :global(.el-tab-pane) {
    height: 100%;
  }

  .data-store-tabs :global(.el-tabs__header) {
    margin-bottom: 0;
  }

  .data-store-tabs :global(.el-tabs__nav-scroll) {
    padding-left: 10px;
    padding-right: 10px;
  }

  .data-store-tabs :global(.el-tabs__nav-wrap::after) {
    height: 1px;
  }

  .data-store-tabs :global(.el-tabs__item) {
    height: 49px;
    line-height: 49px;
  }

  .data-store-container {
    padding: 10px;
  }

  .data-store-tree {
    font-size: 12px;
  }

  .data-store-tree-icon {
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
    width: 12px;
  }

  .data-store-tree-wrapper :global(.el-icon-caret-right::before) {
    font-family: 'Font Awesome 5 Free';
    content: '\f0fe';
  }

  .data-store-tree-wrapper :global(.expanded.el-icon-caret-right::before) {
    font-family: 'Font Awesome 5 Free';
    content: '\f146';
  }

  .data-store-tree-wrapper :global(.el-tree-node__expand-icon.expanded) {
    transform: rotate(0deg);
  }
</style>
<style lang="scss" scoped>
  .data-store-tree-wrapper::v-deep {
    .el-tree>.el-tree-node:after {
      border-top: none;
    }

    .el-tree-node__content>.el-tree-node__expand-icon {
      padding-right: 2px;
    }

    .el-tree-node {
      position: relative;
      padding-left: 16px;
    }

    .el-tree-node__expand-icon.is-leaf {
      display: none;
    }

    .el-tree-node__children {
      padding-left: 16px;
    }

    .el-tree-node :last-child:before {
      height: 38px;
    }

    .el-tree>.el-tree-node:before {
      border-left: none;
    }

    .el-tree>.el-tree-node:after {
      border-top: none;
    }

    .el-tree-node:before {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:after {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .el-tree-node:before {
      border-left: 1px dashed #ccc;
      bottom: 0px;
      height: 100%;
      top: -26px;
      width: 1px;
    }

    .el-tree-node:after {
      border-top: 1px dashed #ccc;
      height: 20px;
      top: 12px;
      width: 20px;
    }
  }
</style>