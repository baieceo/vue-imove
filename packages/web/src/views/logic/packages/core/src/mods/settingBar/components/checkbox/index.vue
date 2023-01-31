<template>
  <div class="container">
    <p class="titleText">{{title}}</p>
    <el-checkbox :name="name" v-model="privateValue" :disabled="disabled" />
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  export default {
    props: {
      value: {
        type: [Boolean, String, Number, Object, Array, Function]
      },
      name: {
        type: String
      },
      title: {
        type: String
      },
      disabled: {
        type: Boolean,
        default: false
      },
      description: {
        type: String,
        default: ''
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