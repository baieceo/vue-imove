<template>
<div class="container">
    <!-- <a href="https://github.com/imgcook/imove">
        <span class="titleText">iLogic</span>
    </a> -->
        <div class="widgets">
            <Guide />
            <Export :flow-chart="flowChart" />
            <ImportDSL :flow-chart="flowChart" />

            <template v-if="connectStatus">
                <ConnectStatus :status="status" :projectName="projectName" @sync-local="syncLocal"
                    @confirm-to-sync="confirmToSync" />
                <Configuration @confirm-to-sync="confirmToSync" />
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import './index.module.scss';
</style>

<script>
import { Graph } from '@antv/x6';
import Guide from './guide';
import Export from './export';
import ImportDSL from './importDSL';
import ConnectStatus, {
    Status
} from './connectStatus';
import Configuration from './configuration';
import {
    localConnect
} from '../../api';

    export default {
        components: {
            Guide,
            Export,
            ImportDSL,
            ConnectStatus,
            Configuration
        },
        props: {
            flowChart: {
                type: Graph
            },
            connectStatus: {
                type: Boolean
            },
            connectMethod: {
                type: Function
            }
        },
        data() {
            return {
                projectName: '',
                status: Status.disconnected
            }
        },
        methods: {
            // network
            syncLocal() {
                return (this.connectMethod || localConnect)()
                    .then((res) => res.json())
                    .then((data = {}) => {
                        this.status = Status.connected;
                        this.projectName = data.projectName;
                        return data;
                    })
                    .catch((error) => {
                        console.log(error);
                        this.status = Status.disconnected;
                        console.log('connect local failed, the error is:', error.message);
                    });
            },
            confirmToSync() {
                return this.syncLocal().then((data) => {
                    const {
                        dsl
                    } = data || {};

                if (dsl) {

                    this.$confirm('本地连接成功，是否将数据同步至当前项目？')
                        .then(_ => {
                            try {
                                this.flowChart.fromJSON(dsl);

                                console.log(_);
                            } catch (error) {
                                this.$message.error('同步失败！');
                            }
                        })
                        .catch(_ => {
                            console.error(_);
                        });
                }
            });
        }
    }
}
</script>
