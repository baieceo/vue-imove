<template>
  <VueElementForm v-model="model" :schema="schema" :formProps="{size: 'mini'}" :formFooter="{ show: false }" />
</template>

<script>
  const VueElementForm = () =>
    import('../../../schema/lib/vue2/vue2-form-element/src/index.js');

  export default {
    name: 'schema-setter',
    components: {
      VueElementForm,
    },
    props: {
      schema: Object,
    },
    data() {
      return {
        model: {},
      };
    },
    mounted() {
      this.model = this.schema;
    },
    watch: {
      schema: {
        handler(val) {
          this.model = val;
        },
        deep: true,
        immediate: true,
      },
      model() {
        this.$emit('update:schema', this.model);
      },
    },
  };
</script>

<style scoped></style>