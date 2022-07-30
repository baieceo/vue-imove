<template>
    <el-container>
        <el-aside width="200px">
            <div :class="$style['layout__aside']">
                <el-scrollbar style="height: 100%;">
                    <el-menu router :default-active="defaultActive">
                        <el-menu-item index="/project/list">
                            <span slot="title">
                                项目管理
                            </span>
                        </el-menu-item>
                        <el-menu-item index="/logic/list">
                            <span slot="title">
                                逻辑管理
                            </span>
                        </el-menu-item>
                        <el-menu-item index="/schema/designer">
                            <span slot="title">
                                表单生成
                            </span>
                        </el-menu-item>
                    </el-menu>
                </el-scrollbar>
            </div>
        </el-aside>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            defaultActive: ''
        }
    },
    created() {
        this.defaultActive = this.$route.path;
    }
}
</script>

<style lang="scss" module>
    .layout {
        &__aside {
            border-right: 1px solid #EEE;
            height: 100%;
            overflow: hidden;

            :global {
                .el-scrollbar__wrap {
                    overflow-x: hidden;
                }

                .is-horizontal {
                    display: none;
                }
            }
        }
    }
</style>