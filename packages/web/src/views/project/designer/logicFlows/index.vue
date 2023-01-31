<template>
    <div :class="$style['cards']">
        <div :class="$style['cards__head']">
            <el-dropdown size="mini" @command="handleLogicFlowCommand">
                <el-button type="primary" size="mini">
                    添加逻辑<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in types" :key="item.name" :command="item.name">{{item.title}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div :class="$style['cards__body']">
            <template v-if="currentNode && currentNode.logicFlows && currentNode.logicFlows.length">
                <div :class="$style['card']" v-for="(logicItem, logicIndex) in currentNode.logicFlows"
                    :key="logicItem.key">
                    <div :class="$style['card__head']">
                        <h3 :class="$style['card__title']">{{logicItem.title}}</h3>
                        <div :class="$style['card__tools']">
                            <el-button type="text" size="mini" :disabled="logicIndex === 0" icon="el-icon-arrow-up"
                                @click="() => handleLogicFlowMove(logicIndex, -1)"></el-button>
                            <el-button type="text" size="mini" :disabled="logicIndex === currentNode.events.length - 1"
                                icon="el-icon-arrow-down" @click="() => handleLogicFlowMove(logicIndex, 1)"
                                style="margin-right: 5px;">
                            </el-button>
                            <el-popconfirm title="确定删除此逻辑吗？" @confirm="() => handleLogicFlowRemove(logicItem.id)">
                                <el-button slot="reference" size="mini" type="text" icon="el-icon-delete"></el-button>
                            </el-popconfirm>
                        </div>
                    </div>
                    <div :class="$style['card__body']">
                        <div :class="$style['card__item']">
                            <div :class="$style['card__item-head']">
                                逻辑标识：
                            </div>
                            <div :class="$style['card__item-body']">
                                <el-input size="mini" v-model="logicItem.id" />
                            </div>
                        </div>
                        <div :class="$style['card__item']">
                            <div :class="$style['card__item-head']">
                                场景名称：
                            </div>
                            <div :class="$style['card__item-body']">
                                <el-select size="mini" :value="logicItem.logic.id"
                                    @change="(logicId) => onLogicIdChange(logicId, logicIndex)">
                                    <el-option v-for="itme in logicFlows" :key="itme.title" :label="itme.title"
                                        :value="itme.id" />
                                </el-select>
                            </div>
                        </div>
                        <div :class="$style['card__item']">
                            <div :class="$style['card__item-head']">
                                触发逻辑：
                            </div>
                            <div :class="$style['card__item-body']">
                                <el-select size="mini" :value="logicItem.logic.trigger"
                                    @change="(triggerId) => onTriggerIdChange(triggerId, logicIndex)" placeholder="请选择">
                                    <el-option v-for="cell in getStartCells(logicItem.logic.id)" :key="cell.id"
                                        :label="cell.data.label" :value="cell.id" />
                                </el-select>
                            </div>
                        </div>

                        <div :class="$style['card__item']" v-for="(cellItem) in getConfigCells(logicItem)"
                            :key="cellItem.id">
                            <div :class="$style['card__item-head']">{{cellItem.data.label}}投放配置{{cellItem.key}}</div>
                            <div :class="$style['card__item-body']">
                                <schema-form :value="cellItem.data.configData"
                                    :schema="getCellConfigSchema(cellItem.data.configSchema)"
                                    @on-change="({ newValue }) => onCellConfigSchemaChange(newValue, logicIndex, cellItem.id)"
                                    :formProps="{size: 'mini'}" :formFooter="{ show: false }" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <el-empty v-else description="暂无逻辑"></el-empty>
        </div>
    </div>
</template>

<script>
    import lodash from 'lodash';
    import {
        genid
    } from '../../../../utils/utils';
    import {
        apiLogicflowList
    } from '../../../../services/logicflow';
    import SchemaForm from '../../../schema/lib/vue2/vue2-form-element/src/index.js';

    export default {
        name: 'logicFlows',
        inject: ['env', 'getCurrentNode'],
        components: {
            SchemaForm
        },
        data() {
            return {
                types: [{
                    name: 'active',
                    title: '主动逻辑'
                }, {
                    name: 'passive',
                    title: '被动逻辑'
                }],
                // 逻辑场景列表
                logicFlows: []
            }
        },
        computed: {
            currentNode() {
                return this.getCurrentNode();
            },
        },
        created() {
            this.fetchLogicFlows();
        },
        methods: {
            // 获取逻辑场景列表
            async fetchLogicFlows() {
                try {
                    const {
                        list
                    } = await apiLogicflowList({
                        pageNo: 1,
                        pageSize: 999
                    });

                    this.logicFlows = list;
                } catch (e) {
                    console.error('获取逻辑场景列表异常', e);
                }
            },
            // 逻辑命令
            handleLogicFlowCommand(command) {
                const logicFlow = {
                    ...this.types.find(e => e.name === command)
                };
                const uuid = `logicFlow_${genid()}`;
                
                logicFlow.type = logicFlow.name;

                delete logicFlow.name;
                
                logicFlow.id = uuid;
                logicFlow.key = uuid;
                logicFlow.logic = {
                    id: '', // 关联逻辑ID
                    trigger: '', // 触发子逻辑ID
                    // 逻辑源
                    source: {
                        dsl: {
                            cells: []
                        }
                    }
                };

                if (!window.logicFlowsMap) {
                    window.logicFlowsMap = {};
                }

                window.logicFlowsMap[logicFlow.id] = logicFlow;

                this.currentNode.logicFlows.push(logicFlow);
            },
            // 移动逻辑
            handleLogicFlowMove(index, offset) {
                const logicFlows = [...this.currentNode.logicFlows];

                const index1 = index + offset;
                const index2 = index;

                [logicFlows[index1], logicFlows[index2]] = [logicFlows[index2], logicFlows[index1]];

                this.currentNode.logicFlows = [...logicFlows];
            },
            // 删除逻辑
            handleLogicFlowRemove(logicFlowId) {
                const index = this.currentNode.logicFlows.findIndex(event => event.id === logicFlowId);

                this.currentNode.logicFlows.splice(index, 1);
            },

            // 查找DSL链
            chainDSL(dsl) {
                const {
                    cells
                } = dsl;
                // 查找下个单元
                const findNextCell = (id) => {
                    const edge = cells.find(cell => cell.shape === 'edge' && cell.source && cell.source.cell ===
                        id);

                    if (edge) {
                        return cells.find(cell => edge.target && cell.id === edge.target.cell);
                    }

                    return null;
                };

                const loginChain = cells
                    // 找起点
                    .filter(cell => cell.shape === 'imove-start')
                    // 找逻辑链
                    .map(start => {
                        let cell = findNextCell(start.id);
                        const chain = [start];

                        if (cell) {
                            chain.push(cell);
                        }

                        while (cell) {
                            cell = findNextCell(cell.id);

                            if (cell) {
                                chain.push(cell);
                            }
                        }

                        return chain;
                    });


                return {
                    cells: loginChain
                };
            },
            // 逻辑ID改变
            onLogicIdChange(logicId, logicIndex) {
                const logic = this.logicFlows.find(logic => logic.id === logicId);
                const source = lodash.cloneDeep(logic);
                const logicFlows = [...this.currentNode.logicFlows];

                logicFlows[logicIndex].logic.id = source.id;
                logicFlows[logicIndex].logic.version = source.version;
                logicFlows[logicIndex].logic.trigger = '';
                logicFlows[logicIndex].logic.source = source;

                this.currentNode.logicFlows = logicFlows;
            },
            // 触发逻辑ID改变
            onTriggerIdChange(triggerId, logicIndex) {
                const logicFlows = [...this.currentNode.logicFlows];

                logicFlows[logicIndex].logic.trigger = triggerId;

                this.currentNode.logicFlows = logicFlows;
            },
            /**
             * 获取开始节点列表
             * @param {String} logicId 逻辑ID
             * @returns {Array} 单元数组
             */
            getStartCells(logicId) {
                if (!logicId) {
                    return [];
                }

                const logicFlow = this.logicFlows.find(item => item.id === logicId);

                if (logicFlow) {
                    return logicFlow.dsl.cells.filter(item => item.shape ===
                        'imove-start');
                } else {
                    return [];
                }
            },
            /**
             * 获取有投放配置的节点列表
             * @param {String} logicId 逻辑ID
             * @param {String} triggerId 触发ID
             * @returns {Array} 单元数组
             */
            getConfigCells(logicFlow) {
                if (!logicFlow || !logicFlow.logic.id || !logicFlow.logic.trigger) {
                    return [];
                }

                const {
                    logic: {
                        source: {
                            dsl = {}
                        }
                    }
                } = logicFlow;

                const {
                    cells = []
                } = this.chainDSL(dsl);
                const chain = cells.find(group => group.find(cell => cell.id === logicFlow.logic.trigger)) || [];

                try {
                    const configSchemaCells = chain.filter(cell => cell.data && cell.data.configSchema && JSON
                        .stringify(JSON
                            .parse(cell.data
                                .configSchema)) !== '{}');

                    return configSchemaCells;
                } catch (e) {
                    console.error(e);

                    return [];
                }
            },
            // 获取单元Schema
            getCellConfigSchema(schemaStr) {
                try {
                    return JSON.parse(schemaStr).schema;
                } catch (e) {
                    console.error(e);

                    return {};
                }
            },
            // 单元投放配置改变
            onCellConfigSchemaChange(newValue, logicIndex, cellId) {
                const logicFlows = [...this.currentNode.logicFlows];
                const source = logicFlows[logicIndex].logic.source;
                const cellIndex = source.dsl.cells.findIndex(cell => cell.id === cellId);

                logicFlows[logicIndex].logic.source.dsl.cells[cellIndex].data.configData = {
                    ...logicFlows[logicIndex].logic.source.dsl.cells[cellIndex].data.configData,
                    ...newValue
                };

                this.currentNode.logicFlows = [...logicFlows];
            },
        }
    };
</script>

<style lang="scss" module>
    @import '../common.module.scss';
</style>