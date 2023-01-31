<template>
    <el-button
        v-bind="$attrs"
        v-on="$listeners"
    >
        {{ text }}
    </el-button>
</template>

<script>
export default {
    name: 'ButtonWidget',
    props: {
        text: String
    }
};
</script>
