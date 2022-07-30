<template>
    <div :style="{height: 'calc(100vh - 60px)', width: '100%' }">
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