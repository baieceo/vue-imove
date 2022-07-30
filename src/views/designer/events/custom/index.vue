<template>
    <div :class="$style['event__item']">
        <div :class="$style['event__item-head']">
            自定义点击代码：
        </div>
        <div :class="$style['event__item-body']">
            <el-input type="textarea" size="mini" :rows="5" :value="value" @input="handleInput" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'event-custom',
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