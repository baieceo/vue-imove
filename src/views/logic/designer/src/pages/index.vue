<template>
    <div :style="{height: '100vh' }">
      <ILogic @onSave="onSave" />
    </div>
</template>

<script>
import ILogic from '../../../packages/core/src/index.vue';

export default {
    components: {
        ILogic
    },
    methods: {
        onSave(data) {
            console.log(data);
        }
    }
}
</script>