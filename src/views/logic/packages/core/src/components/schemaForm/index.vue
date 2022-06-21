<template>
  <div>
    <template v-if="canVisibleForm">
      <VueElementForm v-model="privateSchema" :schema="schema" :formFooter="{ show: false }"
        :formProps="{size: 'mini'}" />
      <div class="btnWrap">
        <el-button size="mini" class="btn" type="primary" @click="onClickSave">
          保存
        </el-button>
      </div>
    </template>
    <template v-else>
      <el-empty description="请编辑投放配置schema"></el-empty>
    </template>
  </div>

</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  const VueElementForm = () =>
    import('../../../../../../schema/lib/vue2/vue2-form-element/src/index');

  export default {
    components: {
      VueElementForm,
    },
    props: {
      schema: Object,
    },
    data() {
      return {
        privateSchema: {},
      };
    },
    computed: {
      canVisibleForm() {
        const {
          properties = {}
        } = this.schema || {};

        return this.schema && Object.keys(properties).length > 0;
      }
    },
    mounted() {
      this.privateSchema = this.schema;
    },
    methods: {
      changeConfig() {
        const configData = {
          ...this.privateSchema
        };
        const dataProps = ['properties', 'type', 'required'];

        Object.keys(configData).forEach(key => {
          if (dataProps.includes(key) || /^ui:/.test(key)) {
            delete configData[key];
          }
        });

        const schema = {
          schema: {
            ...this.privateSchema
          }
        };

        schema['uiSchema'] = {};
        schema['formFooter'] = {
          'show': false
        };
        schema['formProps'] = {
          'labelWidth': '100px',
          'labelSuffix': '：'
        };

        Object.keys(schema.schema).forEach(key => {
          if (configData[key]) {
            delete schema.schema[key];
          }
        });

        const configSchema = JSON.stringify(schema);

        return {
          configData,
          configSchema
        }
      },
      onClickSave() {
        this.$emit('change-config', this.changeConfig());

        this.$message.success('投放配置保存成功！');
      }
    },
    watch: {
      schema: {
        handler(val) {
          this.privateSchema = val;
        },
        deep: true,
        immediate: true,
      },
      privateSchema: {
        handler(val) {
          this.$emit('update:schema', val);
          // this.$emit('change-config', this.changeConfig());
        },
        deep: true
      },
    },
  };
</script>