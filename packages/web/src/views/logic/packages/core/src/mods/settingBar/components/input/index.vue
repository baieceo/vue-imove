<template>
  <div>
    <p class="titleText">{{title}}</p>
    <el-input size="mini" :name="name" v-model="privateValue" :disabled="disabled" />
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  export default {
    props: {
      value: {
        type: [String, Number]
      },
      title: {
        type: String
      },
      name: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      valueChange: {
        type: Function,
        default () {
          return () => {};
        }
      }
    },
    data() {
      return {
        privateValue: this.value
      }
    },
    watch: {
      value(value) {
        if (value !== this.privateValue) {
          this.privateValue = value;
        }
      },
      privateValue(value) {
        if (value !== this.value) {
          this.$emit('value-change', value);
        }
      }
    }
  }
</script>