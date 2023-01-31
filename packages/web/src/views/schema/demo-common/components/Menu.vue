<template>
  <div :class="$style.box">
    <el-menu
      v-bind="$attrs"
      :class="$style.menu"
      mode="horizontal"
      text-color="#333"
      active-text-color="#409eff"
    >
      <el-menu-item v-if="$attrs.version === 'vue2'" index="4">
        <router-link :class="$style.menuLink" :to="{ name: 'SchemaGenerator' }">
          <i :class="$style.menuIcon"></i>Generator 生成器
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link
          :class="$style.menuLink"
          :to="{
            name: 'SchemaPlayground',
            query: { ui: 'VueElementForm', type: 'Simple' },
          }"
        >
          <i :class="$style.menuIcon"></i>Playground 验证器
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
};
</script>

<style module>
.box {
  margin: 0 auto;
  :global {
    .el-menu.el-menu--horizontal {
      border-bottom: none;
    }
    .el-menu--horizontal > .el-menu-item.is-active {
      border-bottom-width: 3px;
    }
    .el-menu--horizontal > .el-menu-item {
      padding-left: 14px;
      padding-right: 0;
      margin: 0 20px;
      height: 80px;
      line-height: 80px;
    }
  }
  .menuLink {
    display: flex;
    align-items: center;
    text-decoration: none;
  }
  .menuIcon {
    position: absolute;
    left: -8px;
    font-size: 14px;
    margin-right: 0;
    color: #666666;
  }
}
</style>
