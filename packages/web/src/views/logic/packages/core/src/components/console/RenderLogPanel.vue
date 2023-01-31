<template>
    <div class="logPanel">
        <LogLine v-for="(log, index) in logList" :key="index" v-bind="log" />
    </div>
</template>

<style lang="scss" scoped>
    @import './index.module.scss';
</style>

<script>
    import LogLine from './LogLine.vue';

    export default {
        components: {
            LogLine
        },
        props: {
            logList: {
                type: Array
            }
        }
    }
</script>