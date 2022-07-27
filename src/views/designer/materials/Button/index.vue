<template>
    <button :data-id="$vnode.key">按钮</button>
</template>

<script>
export default {
    name: 'Button',
    inject: ['env'],
    data() {
        return {};
    }
}
</script>