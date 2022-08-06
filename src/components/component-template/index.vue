<template>
    <div :class="[$style['component-template'], currentNodeKey === nodeKey && $style['current-node']]" :id="nodeKey"
        @click.self="onClick">
        <component :is="componentName" v-bind="$attrs" :key="nodeKey" />
    </div>
</template>

<script>
    import {
        compileForOnline
    } from '@/views/logic/packages/compile-code/src';

    // 生成自定义代码
    const generateCustomCode = (logicId) => {
        return `
  
      if (!window.logicFlowsMap) {
        window.logicFlowsMap = {};
      }
  
      if (!window.logicFlowsMap['${logicId}']) {
        window.logicFlowsMap['${logicId}'] = logic;
      };

      return Promise.resolve(logic);
    `;
    };

    // 逻辑流触发
    const logicFlowsTrigger = (logicFlows) => {
        try {
            logicFlows.forEach(logicFlow => {
                const {
                    dsl = {}
                } = logicFlow.logic.source;
                const {
                    cells = []
                } = dsl;
                const {
                    data = {}
                } = cells.find(cell => cell.id === logicFlow.logic.trigger) || {};
                const {
                    trigger
                } = data;

                if (trigger && window.logicFlowsMap && window.logicFlowsMap[logicFlow.id]) {
                    window.logicFlowsMap[logicFlow.id].invoke(trigger);
                }
            });

        } catch (e) {
            console.error('逻辑执行异常', e);
        }
    };

    export default {
        name: 'ComponentTemplate',
        inject: ['env', 'getCurrentNode', 'getProjectSchema'],
        props: {
            componentName: String
        },
        computed: {
            currentNode() {
                return this.getCurrentNode();
            },
            currentNodeKey() {
                return this.currentNode.id;
            },
            nodeKey() {
                return this.$vnode.key;
            }
        },
        async mounted() {
            const node = this.findNodeSchemaById(this.$vnode.key);
            const {
                events = [], logicFlows = []
            } = node;

            // 自定义挂载事件
            const customMountedEvents = events.filter(event => event.name === 'event-custom' && event
                .value.type ===
                'mounted');

            // 执行自定义挂载事件
            customMountedEvents.forEach(event => {
                const {
                    code = 'function () {}'
                } = event.value;

                this.exec(code);
            });

            // 主动逻辑
            const activeLogicFlows = logicFlows.filter(logicFlow => logicFlow.type === 'active');

            // 设计态：注册逻辑流
            if (this.env === 'design') {
                await this.registerLogicFlows();
            }

            logicFlowsTrigger(activeLogicFlows)
        },
        methods: {
            // 注册逻辑流
            registerLogicFlows() {
                const node = this.findNodeSchemaById(this.$vnode.key);
                const {
                    logicFlows = []
                } = node;
                const logicFlowsQueue = [];

                // 注册逻辑
                logicFlows.forEach(logicFlow => {
                    if (!window.logicFlowsMap) {
                        window.logicFlowsMap = {};
                    }

                    if (!window.logicFlowsMap[logicFlow.id]) {
                        // 编译代码
                        const logicFlowCode = compileForOnline(
                            logicFlow.logic.source.dsl, {}, {
                                customCode: {
                                    'index.js': generateCustomCode(logicFlow.id),
                                },
                            }
                        );

                        logicFlowsQueue.push((new Function(logicFlowCode))());
                    }
                });

                return Promise.all(logicFlowsQueue);
            },
            // 通过id查找节点schema
            findNodeSchemaById(id) {
                const projectSchema = this.getProjectSchema();
                const {
                    componentsTree
                } = projectSchema;
                let node;
                const findNode = (id, nodes) => {
                    for (let i = 0; i < nodes.length; i++) {
                        if (nodes[i].children && nodes[i].children.length) {
                            findNode(id, nodes[i].children);
                        }

                        if (nodes[i].id === id) {
                            node = nodes[i];

                            break;
                        }
                    }
                }

                findNode(id, componentsTree);

                return node;
            },
            // 执行代码
            exec(code) {
                new Function(`return ${code}`)().call(this);
            },
            // 点击事件
            onClick() {
                if (this.env === 'design') {
                    return false;
                }

                const node = this.findNodeSchemaById(this.$vnode.key);
                const {
                    events = [], logicFlows = []
                } = node;

                // 自定义点击事件
                const customClickEvents = events.filter(event => event.name === 'event-custom' && event.value.type ===
                    'click');

                customClickEvents.forEach(event => {
                    const {
                        code = 'function () {}'
                    } = event.value;

                    this.exec(code);
                });

                // 被动逻辑
                const passiveLogicFlows = logicFlows.filter(logicFlow => logicFlow.type === 'passive');

                logicFlowsTrigger(passiveLogicFlows);
            }
        }
    }
</script>

<style module>
    .component-template {}

    .current-node {
        box-shadow: 0 0 0 1px rgba(25, 137, 250, .8), inset 0 0 0 1px rgba(25, 137, 250, .8);
    }
</style>