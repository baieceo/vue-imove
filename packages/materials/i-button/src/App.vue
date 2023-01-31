<template>
  <div id="app">
    <my-component />
  </div>
</template>

<script>
import MyComponent from './index.vue'

export default {
  name: 'App',
  provide: {
    env: 'design'
  },
  components: {
    MyComponent
  }
}
</script>