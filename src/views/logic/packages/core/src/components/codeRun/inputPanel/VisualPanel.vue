<template>
  <div class="visualInput">
    <el-form  autoComplete="on" size="mini">
      <VisualFormItem v-for="({type, desc}, index) in inputItems" :key="index" :type="type" :desc="desc" :data="data[type]"
        @change="onChange" />
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import VisualFormItem from './VisualFormItem';

  const inputItems = [{
      type: 'pipe',
      desc: '上一节点返回值'
    },
    {
      type: 'context',
      desc: '当前逻辑流程公用数据'
    },
    {
      type: 'payload',
      desc: '当前逻辑流程通用数据'
    },
    {
      type: 'config',
      desc: '当前节点投放配置'
    },
  ];

  export default {
    components: {
      VisualFormItem
    },
    props: {
      data: {
        type: Object
      }
    },
    data() {
      return {
        activeKey: 'visualTab',
        filedsValue: {},
        inputItems
      };
    },
    methods: {
      onChange({
        type,
        data
      }) {
        const input = {...this.data};

        input[type] = data.reduce((prev, cur) => {
              const {
                key = '', value
              } = cur || {};
              prev[key] = value;

              return prev;
            }, {},
        );

        this.$emit('change', input);
      }
    }
  }
</script>