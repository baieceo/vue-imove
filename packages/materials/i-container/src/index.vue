<template>
    <div :class="$style['material-page']">
        {{schema.pageTitle}}
        <component v-for="component in children" :is="component.componentName" :key="component.id"
            v-bind="component.props" :children="component.children" />
        <template v-if="env === 'design'">
            <div :class="$style['material-page__placeholder']" :data-node-key="nodeKey">拖拽组件到这里</div>
        </template>
    </div>
</template>
<script>
    import schema from './schema.json';
    import {
        getSchemaDefaultValues
    } from './utils.js';

    export default {
        name: 'IContainer',
        inject: ['env', 'getCurrentNode'],
        props: {
            env: String,
            schema: {
                type: Object,
                default () {
                    return {
                        ...schema,
                        ...getSchemaDefaultValues(schema)
                    }
                }
            },
            children: Array
        },
        data() {
            return {};
        },
        computed: {
            currentNode() {
                return this.getCurrentNode();
            },
            currentNodeKey() {
                return this.currentNode.id;
            },
            nodeKey() {
                return this.$vnode.key;
            }
        },
    }
</script>

<style lang="css" module>
    .material-page {}

    .material-page__placeholder {
        min-height: 48px;
        background: #f1f1f1;
        border: 1px solid #e0e0e0;
        color: #a7b1bd;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>