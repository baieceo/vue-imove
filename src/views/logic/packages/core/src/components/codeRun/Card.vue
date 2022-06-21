<template>
  <div class="card">
    <div class="cardTitleText">{{title}}</div>
    <div class="cardBody">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  export default {
    props: {
      title: {
        type: String
      }
    }
  }
</script>