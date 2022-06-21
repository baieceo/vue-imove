<template>
  <div class="container">
      <el-button size="large" type="text" @click="onOpenEditModal" icon="el-icon-setting"></el-button>
      <EditModal :visible="visible" @ok="onOk" @cancel="onCloseEditModal" />
    </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
import EditModal from './editModal';

export default {
  components: {
    EditModal
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    onOk() {
      this.onCloseEditModal();

      this.$emit('confirm-to-sync');
    },
    onOpenEditModal() {
      this.visible = true;
    },
    onCloseEditModal() {
      this.visible = false;
    } 
  }
}
</script>