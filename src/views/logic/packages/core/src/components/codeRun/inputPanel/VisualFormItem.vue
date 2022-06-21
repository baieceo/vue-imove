<template>
  <div>
    <div class="itemHeader">
      <span class="itemTitleText">{{type}}</span>
      <span class="itemDescText">{{desc}}</span>
    </div>

    <div v-for="(field, index) in fieldsValue" :key="index" class="itemForm">
      <div class="itemFormNode">
        <el-form-item label="key">
          <el-input v-model="field.key" @change="(field) => onChange('key', field.key)" />
        </el-form-item>
        <el-form-item label="value">
          <el-input v-model="field.value" @change="(field) => onChange('value', field.value)" />
        </el-form-item>
        <i class="el-icon-remove-outline" @click="() => remove(index)" />
      </div>
    </div>

    <el-form-item>
      <el-button size="mini" plain icon="el-icon-plus" style="width: 100%;" @click="() => add()">新增</el-button>
    </el-form-item>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  export default {
    props: {
      type: {
        type: String
      },
      desc: {
        type: String
      },
      data: {
        type: Object
      }
    },
    data() {
      return {
        fieldsValue: []
      };
    },
    methods: {
      remove(index) {
        this.fieldsValue.splice(index, 1);

        this.$emit('change', {
          type: this.type,
          data: this.fieldsValue
        });
      },
      add() {
        this.fieldsValue.push({
          key: '',
          value: ''
        });

        this.$emit('change', {
          type: this.type,
          data: this.fieldsValue
        });
      },
      onChange() {
        this.$emit('change', {
          type: this.type,
          data: this.fieldsValue
        });
      }
    },
    watch: {
      data: {
        handler(data) {
          this.fieldsValue = Object.entries(data).map(([key, value]) => {
            return {
              key,
              value
            }
          })
        },
        deep: true
      }
    }
  }
</script>