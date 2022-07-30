<template>
  <VueElementForm :value="schema" @input="value => $emit('update:schema', value)" :schema="schema"
    :formProps="{size: 'mini'}" :formFooter="{ show: false }" />
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
      return {};
    }
  };
</script>

<style scoped></style>