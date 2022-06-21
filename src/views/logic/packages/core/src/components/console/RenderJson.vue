<template>
    <!-- <JsonView
        indentWidth="2"
        theme="monokai"
        :collapsed="false"
        :enableClipboard="false"
        :displayDataTypes="false"
        :displayObjectSize="false"
        :value="data"
      /> -->

    <JsonView :show-double-quotes="true" :expand-depth="10" :value="data" theme="console-json-theme" />
</template>

<script>
    import JsonView from 'vue-json-viewer';

    export default {
        components: {
            JsonView
        },
        props: {
            data: {
                type: Object
            }
        }
    }
</script>