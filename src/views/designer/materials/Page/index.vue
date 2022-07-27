<template>
    <div :class="$style['material-page']" :data-id="$vnode.key">
        <component v-for="component in children" :is="component.componentName" :key="component.id"
            v-bind="component.props" :children="component.children" />
        <template v-if="env === 'design'">
            <div :class="$style['material-page__placeholder']" :data-id="$vnode.key">拖拽组件到这里</div>
        </template>
    </div>
</template>

<script>
    export default {
        name: 'Page',
        inject: ['env'],
        props: {
            children: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data() {
            return {};
        }
    }
</script>

<style lang="scss" module>
    .material-page {
        &__placeholder {
            min-height: 48px;
            background: #f1f1f1;
            border: 1px solid #e0e0e0;
            color: #a7b1bd;
            font-size: 14px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
</style>