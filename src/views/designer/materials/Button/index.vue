<template>
    <button :class="[currentNodeKey === nodeKey && 'current-node']" :id="nodeKey">按钮</button>
</template>

<script>
    import mixins from '../mixins';

    export default {
        name: 'Button',
        mixins,
        data() {
            return {};
        },
    }
</script>