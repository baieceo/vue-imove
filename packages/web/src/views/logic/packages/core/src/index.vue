<template>
    <Layout :flowChart="flowChart">
        <template #header>
            <Header :flowChart="flowChart" :connectStatus="connectStatus" :connect-method="connectMethod" />
        </template>

        <template #toolBar>
            <ToolBar :flowChart="flowChart" :modifyStatus="modifyStatus" :save-method="saveMethod" />
        </template>

        <template #sideBar>
            <SideBar :flowChart="flowChart" />
        </template>

        <template #settingBar>
            <SettingBar :flowChart="flowChart" />
        </template>

        <template #flowChart>
            <FlowChart @ready="onFlowChartReady" :query-graph-method="queryGraphMethod"
                :modify-graph-method="modifyGraphMethod" />
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
        props: {
            // 是否显示修改状态
            modifyStatus: {
                type: Boolean,
                default: true
            },
            // 是否显示连接状态
            connectStatus: {
                type: Boolean,
                default: true
            },
            // 保存方法，返回Promise
            saveMethod: {
                type: Function
            },
            // 连接方法，返回Promise
            connectMethod: {
                type: Function
            },
            // 查询图形方法，返回Promise
            queryGraphMethod: {
                type: Function
            },
            // 修改图形方法，返回Promise
            modifyGraphMethod: {
                type: Function
            }
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