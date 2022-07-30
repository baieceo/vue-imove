<template>
    <div :class="$style['card__item']">
        <div :class="$style['card__item-head']">
            自定义点击代码：
        </div>
        <div :class="$style['card__item-body']">
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
    @import '../../common.module.scss';
</style>