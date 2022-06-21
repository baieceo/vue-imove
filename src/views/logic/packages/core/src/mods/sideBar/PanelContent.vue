<template>
    <div class="panelContent">
        <div v-for="(cellType, index) in cellTypes" :key="index" class="cellWrapper">
            <component :is="cellMap[cellType].name" @mousedown.native="($event) => onMouseDown($event, cellType)" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import './index.module.scss';
</style>

<script>
    import {
        Node
    } from '@antv/x6';
    import cellMap from '../../common/previewCell';

    export default {
        props: {
            dnd: {
                type: Object,
                default () {
                    return {};
                }
            },
            cellTypes: {
                type: Array,
                default () {
                    return [];
                }
            }
        },
        data() {
            return {
                cellMap
            }
        },
        methods: {
            onMouseDown(evt, cellType) {
                this.dnd.start(Node.create({
                    shape: cellType
                }), evt);
            }
        }
    }
</script>