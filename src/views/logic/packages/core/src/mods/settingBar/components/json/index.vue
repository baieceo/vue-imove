<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>{{title}}</span>
      <el-button style="float: right; padding: 3px 0" type="text" @click="onClickEdit">编辑</el-button>
    </div>

    <template v-if="!isConfig">
      <JsonView :expanded="false" :expand-depth="0" :show-double-quotes="true" :value="safeParse(value)" />
    </template>

    <template v-if="isConfig">
      <SchemaForm :schema="schemaFormData" @change-config="changeConfig" />
    </template>

    <EditModal :title="title" :value="value" :visible="visible" :isConfig="isConfig" @ok="onClickOk"
      @cancel="onClickCancel" @change-schema="changeSchema" :defaultSchema="defaultSchema()" />
  </el-card>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Cell
  } from '@antv/x6';

  import JsonView from 'vue-json-viewer';
  import EditModal from './EditModal.vue';
  import {
    safeParse
  } from '../../../../utils';
  import SchemaForm from '../../../../components/schemaForm';

  export default {
    components: {
      EditModal,
      JsonView,
      SchemaForm
    },
    props: {
      title: {
        type: String
      },
      value: {
        type: [String, Object]
      },
      isConfig: {
        type: Boolean,
        default: false
      },
      valueChange: {
        type: Function,
        default () {
          return () => {};
        }
      },
      selectedCell: {
        type: Cell
      }
    },
    data() {
      return {
        visible: false,
        schema: {
          type: '',
          properties: {}
        },
        schemaFormData: null
      }
    },
    methods: {
      safeParse,
      defaultSchema() {
        if (this.selectedCell) {
          const {
            configSchema
          } = this.selectedCell.getData();

          if (configSchema) {
            const schema = JSON.parse(configSchema).schema;

            this.schema = schema;

            return schema;
          }
        }
      },
      defaultConfigData() {
        if (this.selectedCell) {
          const {
            configData = {},
              configSchema = {}
          } = this.selectedCell.getData() || {};

          let {
            schema = {}
          } = JSON.parse(configSchema);

          schema = Object.assign({}, schema, configData);

          return schema;
        }
      },
      onClickEdit() {
        this.visible = true;
      },
      onClickCancel() {
        this.visible = false;
      },
      onClickOk(newJson) {
        this.visible = false;

        this.$emit('value-change', newJson);
      },
      changeSchema(schema) {
        this.visible = false;
        this.schema = schema;

        this.$nextTick(() => {
          this.schemaFormData = this.defaultConfigData();
        });
      },
      changeConfig({
        configData = {},
        configSchema = ''
      }) {
        this.selectedCell && this.selectedCell.setData({
          configData,
          configSchema
        });
      }
    },
    watch: {
      selectedCell: {
        handler(selectedCell) {
          if (selectedCell) {
            this.schemaFormData = this.defaultConfigData();
          }
        },
        immediate: true
      },
    }
  }
</script>