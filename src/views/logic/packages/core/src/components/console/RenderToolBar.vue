<template>
    <div class="toolBar">
        <el-input size="mini" clearable placeholder="过滤" prefix-icon="icon-sam icon-sam-guolv"
            @change="onChangeFilter" />
        <el-select size="mini" class="levels" :value="level" @change="onChangeLevel">
            <el-option v-for="method in levelList" :key="method" :value="method" :label="method" />
        </el-select>
        <el-button class="clear" size="mini" type="text" @click="onClickClear" icon="icon-sam icon-sam-qingkonghuancun
"> 清空</el-button>
    </div>
</template>

<style lang="scss" scoped>
    @import './index.module.scss';
</style>

<script>
    export default {
        props: {
            level: {
                type: String
            },
            logList: {
                type: Array
            }
        },
        data() {
            return {
                levelList: ['all', 'log', 'info', 'warn', 'error', 'debug']
            }
        },
        methods: {
            onChangeLevel(level) {
                this.$emit('level-change', level);
            },
            onChangeFilter(filter) {
                this.$emit('filter-change', filter);
            },
            onClickClear() {
                this.$emit('clear');
            }
        }
    }
</script>