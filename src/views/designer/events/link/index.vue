<template>
    <div :class="$style['event__item']">
        <div :class="$style['event__item-head']">
            跳转地址：
        </div>
        <div :class="$style['event__item-body']">
            <el-input size="mini" :value="value" @input="handleInput" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'event-link',
        props: {
            value: String
        },
        methods: {
            handleInput(value) {
                this.$emit('update:value', value);
            }
        }
    };
</script>

<style lang="scss" module>
    @import '../event.module.scss';
</style>