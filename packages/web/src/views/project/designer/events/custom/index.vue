<template>
    <div :class="$style['card__item']">
        <div :class="$style['card__item-head']">
            事件类型：
        </div>
        <div :class="$style['card__item-body']">
            <el-select size="mini" :value="value.type" @change="(value) => handleChange('type', value)">
                <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
        </div>
        <div :class="$style['card__item-head']">
            事件代码：
        </div>
        <div :class="$style['card__item-body']">
            <el-input type="textarea" size="mini" :rows="5" :value="value.code"
                @input="(value) => handleChange('code', value)" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'event-custom',
        props: {
            value: {
                type: Object,
                default () {
                    return {
                        type: 'click',
                        code: 'function () {}'
                    }
                }
            }
        },
        data() {
            return {
                types: [{
                    label: '点击',
                    value: 'click'
                }, {
                    label: '挂载',
                    value: 'mounted'
                }]
            }
        },
        methods: {
            handleChange(key, value) {
                const data = { ...this.value };

                data[key] = value;

                this.$emit(`update:value`, data);
            }
        }
    };
</script>

<style lang="scss" module>
    @import '../../common.module.scss';
</style>