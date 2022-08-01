<template>
    <div :style="{height: 'calc(100vh - 60px)', width: '100%' }">
        <i-logic :modify-status="false" :connect-status="false" :connect-method="connectMethod"
            :query-graph-method="queryGraphMethod" :save-method="saveMethod" :modify-graph-method="modifyGraphMethod" />
    </div>
</template>

<script>
    import ILogic from '../../../packages/core/src/index.vue';
    import {
        apiLogicflowQuery,
        apiLogicflowUpdate
    } from '../../../../../services/logicflow';

    export default {
        components: {
            ILogic
        },
        computed: {
            id() {
                return this.$route.query.id;
            },
            action() {
                if (!this.id) {
                    return 'add';
                }

                return 'edit';
            },
        },
        methods: {
            connectMethod() {
                return Promise.resolve();
            },
            async queryGraphMethod() {
                if (this.action === 'add') {
                    return Promise.resolve({
                        data: {
                            cells: []
                        }
                    });
                }

                try {
                    const response = await apiLogicflowQuery({
                        id: this.id
                    });

                    this.logic = response;

                    return Promise.resolve({
                        data: response.dsl.cells
                    });
                } catch (e) {
                    return Promise.reject(e);
                }
            },
            async saveMethod({
                dsl
            }) {
                try {
                    const params = {
                        dsl
                    };

                    if (this.id) {
                        params.id = this.id;
                    }

                    const response = await apiLogicflowUpdate(params);

                    this.logic = response;

                    this.$message.success('保存成功');

                    if (!params.id) {
                        return this.$router.replace({
                            name: 'LogicDesigner',
                            params: {
                                id: response._id
                            }
                        });
                    }

                    return Promise.resolve(response.data);
                } catch (e) {
                    return Promise.reject(e.data.msg);
                }
            },
            modifyGraphMethod() {
                return Promise.resolve();
            },
        }
    }
</script>