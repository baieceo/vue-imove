<template>
    <div :class="$style['setters']">
        <div :class="$style['setter']">
            <div :class="$style['setter__title']">节点名称：</div>
            <p :class="$style['setter__content']">{{currentNode.componentName}}</p>
        </div>
        <div :class="$style['setter']">
            <div :class="$style['setter__title']">节点标识：</div>
            <p :class="$style['setter__content']">{{currentNode.id}}</p>
        </div>

        <component v-for="item in currentNodeProps" :key="currentNode.id + item" :is="item + '-setter'"
            v-bind.sync="currentNode.props" />
    </div>
</template>

<script>
    import setters from './index.js';

    export default {
        name: 'Setters',
        inject: ['env', 'getCurrentNode'],
        components: {
            ...setters
        },
        computed: {
            currentNode() {
                return this.getCurrentNode() || {};
            },
            currentNodeProps() {
                if (!this.currentNode.props) {
                    return [];
                }

                let keys = Object.keys(this.currentNode.props);

                const setterNames = Object.keys(setters);

                keys = keys.filter((v) => {
                    return setterNames.includes(v + '-setter');
                });

                return keys;
            },
        }
    }
</script>

<style lang="scss" module>
    .setters {
        :global {
            .el-form--label-top .el-form-item__label {
                font-size: 12px;
            }
        }
    }

    .setter {
        margin-bottom: 18px;
        font-size: 12px;
    }

    .setter__title {
        line-height: 26px;
        padding-bottom: 6px;
        font-size: 12px;
    }
</style>