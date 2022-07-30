<template>
    <button :class="[currentNodeKey === nodeKey && 'current-node']" :id="nodeKey">{{schema.text}}</button>
</template>

<script>
    import mixins from '../mixins';
    import schema from './schema.json';

    export default {
        name: 'Button',
        mixins,
        props: {
            schema: {
                type: Object,
                default () {
                    return schema;
                }
            }
        },
        data() {
            return {};
        },
    }
</script>