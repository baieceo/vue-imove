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
            <div :class="$style['card']" v-for="(logicFlow) in currentNode.logicFlows"
                :key="logicFlow.key">
                <div :class="$style['card__head']">
                    <h3 :class="$style['card__title']">{{logicFlow.title}}</h3>
                    <div :class="$style['card__tools']">
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="() => handleLogicFlowRemove(logicFlow.id)"></el-button>
                    </div>
                </div>
                <div :class="$style['card__body']">
                    <div :class="$style['card__item']">
                        <div :class="$style['card__item-head']">
                            逻辑标识：
                        </div>
                        <div :class="$style['card__item-body']">
                            <el-input size="mini" v-model="logicFlow.id" />
                        </div>
                    </div>
                    <div :class="$style['card__item']">
                        <div :class="$style['card__item-head']">
                            场景名称：
                        </div>
                        <div :class="$style['card__item-body']">
                            <el-select size="mini" v-model="logicFlow.id">
                                <el-option>场景1</el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'logicFlows',
        inject: ['env', 'getCurrentNode'],
        data() {
            return {
                types: [{
                    name: 'active',
                    title: '主动逻辑'
                }, {
                    name: 'passive',
                    title: '被动逻辑'
                }]
            }
        },
        computed: {
            currentNode() {
                return this.getCurrentNode();
            },
        },
        methods: {
            // 生成uuid
            genUuid(prefix = '') {
                let str = '';

                str = Math.random().toString(36).substr(3);
                str += Date.now().toString(16).substr(4);

                return prefix + str;
            },
            // 逻辑命令
            handleLogicFlowCommand(command) {
                const logicFlow = {
                    ...this.types.find(e => e.name === command)
                };
                const uuid = this.genUuid('logicFlow_');

                logicFlow.id = uuid;
                logicFlow.key = uuid;

                this.currentNode.logicFlows.push(logicFlow);
            },
            // 删除逻辑
            handleLogicFlowRemove(logicFlowId) {
                const index = this.currentNode.logicFlows.findIndex(event => event.id === logicFlowId);

                this.currentNode.logicFlows.splice(index, 1);
            }
        }
    };
</script>

<style lang="scss" module>
    @import '../common.module.scss';
</style>