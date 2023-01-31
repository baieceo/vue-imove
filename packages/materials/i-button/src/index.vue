<template>
    <button :class="$style['i-button']">{{schema.text}}</button>
</template>
<script>
import schema from './schema.json';
import { getSchemaDefaultValues } from './utils.js';

export default {
    name: 'IButton',
    inject: ['env'],
    props: {
        schema: {
            type: Object,
            default () {
                return {
                    ...schema,
                    ...getSchemaDefaultValues(schema)
                }
            }
        }
    },
    data() {
        return {};
    }
}
</script>
<style lang="css" module>
.i-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    color: #606266;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}

.i-button:hover {
    color: #409eff;
    border-color: #c6e2ff;
    background-color: #ecf5ff;
}
</style>