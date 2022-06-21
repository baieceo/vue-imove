<template>
    <Layout :flowChart="flowChart">
        <template #header>
            <Header :flowChart="flowChart" />
        </template>

        <template #toolBar>
            <ToolBar :flowChart="flowChart" />
        </template>

        <template #sideBar>
            <SideBar :flowChart="flowChart" />
        </template>

        <template #settingBar>
            <SettingBar :flowChart="flowChart" />
        </template>

        <template #flowChart>
            <FlowChart @ready="onFlowChartReady" />
        </template>
    </Layout>
</template>

<script>
    import './global.index.scss';
    import '@antv/x6/dist/x6.css';

    import Layout from './mods/layout';
    import Header from './mods/header';
    import ToolBar from './mods/toolBar';
    import SideBar from './mods/sideBar';
    import FlowChart from './mods/flowChart';
    import SettingBar from './mods/settingBar';

    export default {
        components: {
            Layout,
            Header,
            ToolBar,
            SideBar,
            FlowChart,
            SettingBar
        },
        data() {
            return {
                flowChart: null
            }
        },
        computed: {

        },
        methods: {
            onFlowChartReady(flowChart) {
                this.flowChart = flowChart;

                console.log('onFlowChartReady', this.flowChart);
            }
        }
    }
</script>