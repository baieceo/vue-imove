<template>
  <div class="container">
    <el-tag :type="status" size="small">{{tagText}}</el-tag>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  const PULSE_RATE = 10 * 1000; // try to connect to local servet per 10 seconds

  export const Status = {
    connected: 'success',
    disconnected: 'danger',
  };

  export default {
    props: {
      status: {
        type: String,
        default: ''
      },
      projectName: {
        type: String,
        default: ''
      },
    },
    data() {
      return {
        timer: null,
        tagText: '本地连接失败'
      };
    },
    created() {
      this.$emit('confirm-to-sync');

      this.timer = setInterval(() => {
        this.$emit('sync-local');
      }, PULSE_RATE);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    },
    watch: {
      status(val) {
        if (val === Status.connected) {
          this.tagText = [this.projectName, '本地连接成功'].join(' ');
        } else {
          this.tagText = [this.projectName, '本地连接失败'].join(' ');
        }
      }
    }
  }
</script>