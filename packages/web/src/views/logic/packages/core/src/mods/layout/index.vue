<template>
    <div class="container">
        <div class="header">
            <template v-if="flowChart">
                <slot name="toolBar" />
                <slot name="header" />
            </template>
        </div>

        <Splitpanes class="default-theme" vertical style="height: 100vh">
            <Pane class="sideBar" size="20" min-size="20" max-size="35">
                <template v-if="flowChart">
                    <slot name="sideBar" />
                </template>
            </Pane>
            <Pane>
                <slot name="flowChart" />
            </Pane>
            <Pane class="settingBar" size="20" min-size="20" max-size="35">
                <template v-if="flowChart">
                    <slot name="settingBar" />
                </template>
            </Pane>
        </Splitpanes>
    </div>
</template>

<style lang="scss" scoped>
    @import './index.module.scss';
</style>

<script>
    import 'splitpanes/dist/splitpanes.css'

    import {
        Graph
    } from '@antv/x6';
    import {
        Splitpanes,
        Pane
    } from 'splitpanes';

    export default {
        components: {
            Splitpanes,
            Pane
        },
        props: {
            flowChart: {
                type: Graph
            }
        }
    }
</script>