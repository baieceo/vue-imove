<template>
    <el-container>
        <el-header>
            <div :class="$style['layout__header']">
                <h1 :class="$style['layout__logo']" @click="() => $router.go(-1)">vue-imove</h1>
            </div>
        </el-header>
        <el-container style="width: 100vw; height: calc(100vh - 60px);">
            <router-view />
        </el-container>
    </el-container>
</template>

<style lang="scss" module>
    .layout {
        &__header {
            position: relative;
            z-index: 20;
            display: flex;
            border-bottom: 1px solid #EEE;
            align-items: center;
            height: 100%;
            margin: 0 -20px;
            padding: 0 20px;
        }

        &__logo {
            font-size: 20px;
            font-weight: 800;
            cursor: pointer;

            &,
            a {
                color: #1989fa;
                text-decoration: none;
            }
        }
    }
</style>