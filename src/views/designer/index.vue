<template>
    <el-container :class="$style.pageContainer">
        <el-header :class="$style.pageHeader">
            <h1 :class="$style.pageTitle"><i class="el-icon-menu"></i>页面设计</h1>
            <div>
                <el-button @click="schemaVisible = true" size="mini">schema</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside :class="$style.materials" width="300px">
                <el-tabs tab-position="left" style="height: 100%">
                    <!-- 物料列表 start -->
                    <el-tab-pane label="组件">
                        <el-tooltip slot="label" effect="dark" content="组件" placement="right">
                            <i class="el-icon-box"></i>
                        </el-tooltip>
                        <draggable :list="materials" :group="{ name: 'materials', pull: false, put: false }"
                            :sort="false" :clone="onCloneMaterial" @end="onDraggableEnd">
                            <div v-for="material in materials" :key="material.componentName"
                                :class="$style.materialItem">
                                <div :class="$style.materialIcon"
                                    :style="{backgroundImage: `url(${material.screenshot})`}" />
                                {{material.title}}
                            </div>
                        </draggable>
                    </el-tab-pane>
                    <!-- 物料列表 end -->

                    <!-- 大纲树 start -->
                    <el-tab-pane>
                        <el-tooltip slot="label" effect="dark" content="大纲" placement="right">
                            <i class="el-icon-s-unfold"></i>
                        </el-tooltip>
                        <el-tree ref="materialsTree" :data="projectSchema.componentsTree" node-key="id"
                            default-expand-all :expand-on-click-node="false" :current-node-key="currentNode.id"
                            :class="$style.materialsTree" highlight-current>
                            <span :class="$style.materialsTreeNode" slot-scope="{ node, data }"
                                @click="() => currentNode = data">
                                <span :class="$style.materialsTreeNodeHead">
                                    <span :class="$style.materialsTreeIcon"
                                        :style="{backgroundImage: `url(${getMaterialByName(data.componentName).icon})`}"></span>
                                    <span>{{ getMaterialByName(data.componentName).title }}</span>
                                </span>
                                <span :class="$style.materialsTreeNodeBody">
                                    <el-link :underline="false" class="el-icon-delete"
                                        @click.stop="() => removeComponentById(data.id)"></el-link>
                                </span>
                            </span>
                        </el-tree>
                    </el-tab-pane>
                    <!-- 大纲树 end -->
                </el-tabs>
            </el-aside>
            <el-main>
                <div :class="$style['pageMain']">
                    <div @click="onSimulatorClick" :class="$style['simulator']">
                        <div :class="$style['simulator__device']">
                            <div :class="$style['simulator__topbar']">{{nowTime}}</div>
                            <div :class="$style['simulator__canvas']">
                                <draggable v-loading="loading" :group="{ name: 'simulator' }" style="height: 100%;">
                                    <template v-if="!loading">
                                        <component v-for="component in projectSchema.componentsTree"
                                            :is="component.componentName" :key="component.id" v-bind="component.props"
                                            :children="component.children" />
                                    </template>
                                </draggable>
                            </div>
                        </div>

                        <div :class="$style['simulator__tools']" v-if="currentNode.id">
                            <el-link :underline="false" class="el-icon-delete"
                                @click.stop="() => removeComponentById(currentNode.id)"></el-link>
                        </div>
                    </div>
                </div>

            </el-main>
            <el-aside :class="$style.setterPane" width="350px">
                <el-tabs style="height: 100%">
                    <!-- 属性 start -->
                    <el-tab-pane label="属性">
                        <div v-if="currentNode.id">
                            <div :class="$style['setter']">
                                <div :class="$style['setter__title']">节点名称：</div>
                                <p :class="$style['setter__content']">{{currentNode.componentName}}</p>
                            </div>
                            <div :class="$style['setter']">
                                <div :class="$style['setter__title']">节点标识：</div>
                                <p :class="$style['setter__content']">{{currentNode.id}}</p>
                            </div>
                            <Setters />
                        </div>
                        <template v-else>
                            <el-empty description="请选择节点" />
                        </template>
                    </el-tab-pane>
                    <!-- 属性 end -->
                    <!-- 事件 start -->
                    <el-tab-pane label="事件">
                        <template v-if="currentNode.id">
                            事件面板
                        </template>
                        <template v-else>
                            <el-empty description="请选择节点" />
                        </template>
                    </el-tab-pane>
                    <!-- 事件 end -->
                    <!-- 逻辑 start -->
                    <el-tab-pane label="逻辑">
                        <template v-if="currentNode.id">
                            逻辑面板
                        </template>
                        <template v-else>
                            <el-empty description="请选择节点" />
                        </template>
                    </el-tab-pane>
                    <!-- 逻辑 end -->
                </el-tabs>
            </el-aside>
        </el-container>

        <el-dialog title="Schema" :visible.sync="schemaVisible" fullscreen>
            <CodeEditor ref="SchemaCodeEditor" :options="{ language: 'json' }"
                :value="JSON.stringify(projectSchema, null, 2)" @change="onSchemaEditorChange"
                style="width: 100vw; height: calc(100vh - 64px); margin: -20px -20px -30px; overflow: hidden;" />
        </el-dialog>
    </el-container>
</template>

<script>
    import Vue from 'vue';
    import Setters from './setters/index.vue';
    import CodeEditor from '../logic/packages/core/src/components/codeEditor';
    import projectSchema from './projectSchema';

    export default {
        name: 'Designer',
        components: {
            Setters,
            CodeEditor
        },
        provide() {
            return {
                env: 'design',
                getCurrentNode: () => this.currentNode
            }
        },
        data() {
            return {
                loading: true,
                // 物料库
                materials: [],
                projectSchema,
                // 环境：design/runtime
                env: 'design',
                // 克隆物料
                cloneMaterial: {},
                // 选中节点
                currentNode: {},
                // 当前时间
                nowTime: '',
                // schema可见
                schemaVisible: false
            }
        },
        async created() {
            try {
                this.startNowTime();

                this.loading = true;

                await this.fetchMaterials();

                await this.registerMaterials();

                this.loading = false;
            } catch (e) {
                console.error('创建错误', e);
            }
        },
        methods: {
            // 开始获取当前时间
            startNowTime() {
                this.getNowTime();

                setInterval(this.getNowTime, 60 * 1000);
            },
            getNowTime() {
                const now = new Date();

                this.nowTime =
                    `${now.getHours().toString().padStart('0', 2)}:${now.getMinutes().toString().padStart('0', 2)}`;
            },
            // 生成uuid
            genUuid(prefix = '') {
                let str = '';

                str = Math.random().toString(36).substr(3);
                str += Date.now().toString(16).substr(4);

                return prefix + str;
            },
            // 根据id查找组件
            findComponentById(components, id) {
                const findComponent = (components, id) => {
                    if (!(components instanceof Array)) return null;

                    for (let i in components) {
                        let item = components[i];

                        if (item.id === id) return item;

                        if (item.children) {
                            let target = findComponent(item.children, id);

                            if (target) return target
                        }
                    }
                }

                return findComponent(components, id);
            },
            // 根据id查找父级组件
            findComponentParentById(components, id) {
                const findComponentParentById = (components, id) => {
                    let parent;

                    const findParent = (nodes, id) => {
                        for (let i in nodes) {
                            const node = nodes[i];
                            const target = (node.children || []).find(n => n.id === id);

                            if (target) {
                                parent = node;

                                break;
                            }

                            if (node.children) {
                                findParent(node.children, id);
                            }
                        }
                    };

                    findParent(components, id);

                    return parent;
                }

                return findComponentParentById(components, id);
            },
            // 加载物料库
            async fetchMaterials() {
                try {
                    const materials = (await import(`./materials/index.js`)).default;

                    this.materials = materials;

                    return Promise.resolve(materials);
                } catch (e) {
                    return Promise.reject(e);
                }
            },
            // 注册物料库
            registerMaterials() {
                try {
                    const materials = this.materials.map(component => Vue.component(component.componentName, () =>
                        import(`${component.package}`)));

                    return Promise.all(materials);
                } catch (e) {
                    console.error('注册物料错误', e);

                    return Promise.reject(e);
                }
            },
            // 通过名称获取物料配置
            getMaterialByName(componentName) {
                const materials = [...this.materials];

                for (let i = 0; i < materials.length; i++) {
                    const material = materials[i];

                    if (material.componentName === componentName) {
                        return material;
                    }
                }

                return '';
            },
            // 克隆物料
            async onCloneMaterial(material) {
                // 获取物料实例
                const component = this.$root.$options.components[material.componentName];
                const componentData = (await component()).default;

                // 解析物料属性
                const props = {};

                for (let key in componentData.props) {
                    props[key] = [Object, Array].includes(componentData.props[key].type) ?
                        componentData.props[key].default() :
                        componentData.props[key].default;
                }

                this.cloneMaterial = {
                    // ...material,
                    id: this.genUuid(`node_`),
                    props,
                    events: [], // 事件列表
                    logicFlows: [], // 逻辑列表
                    children: [], // 子组件列表
                    componentName: material.componentName,
                }
            },
            // 拖拽结束
            onDraggableEnd(e) {
                const {
                    originalEvent: {
                        target: {
                            dataset: {
                                nodeKey
                            }
                        }
                    }
                } = e;
                const projectSchema = {
                    ...this.projectSchema
                };

                const target = this.findComponentById(projectSchema.componentsTree, nodeKey);

                if (target && target.children) {
                    target.children.push({
                        ...this.cloneMaterial
                    });
                }

                this.currentNode = this.cloneMaterial;

                this.projectSchema = {
                    ...projectSchema
                };
            },
            // 点击模拟器
            onSimulatorClick(e) {
                let {
                    target
                } = e;

                // 查找组件
                while (!target.id) {
                    target = target.parentNode;
                }

                const currentNode = this.findComponentById(projectSchema.componentsTree, target.id);

                if (currentNode) {
                    this.currentNode = currentNode;
                } else {
                    this.currentNode = {};
                }
            },
            // 通过id删除组件
            removeComponentById(id) {
                const projectSchema = {
                    ...this.projectSchema
                };

                const parent = this.findComponentParentById(projectSchema.componentsTree, id);

                if (parent) {
                    const index = parent.children.findIndex(i => i.id === id);

                    parent.children.splice(index, 1);
                }

                this.projectSchema.componentsTree = [...projectSchema.componentsTree];
            },
            // schema修改
            onSchemaEditorChange(newCode = '') {
                try {
                    this.projectSchema = JSON.parse(newCode);
                } catch (err) {
                    // cancel log to avoid wasting Console outputs
                }
            }
        },
        watch: {
            'currentNode.id'(value) {
                this.$refs['materialsTree'].setCurrentKey(value);
            },
            schemaVisible(value) {
                if (value) {
                    this.$nextTick(() => {
                        this.$refs['SchemaCodeEditor'].setValue(JSON.stringify(this.projectSchema, null, 2));
                    });
                }
            }
        }
    }
</script>

<style>
    .current-node {
        box-shadow: 0 0 0 1px rgba(25, 137, 250, .8);
    }
</style>

<style lang="scss" module>
    .pageContainer {
        height: 100vh;

        :global {
            .el-main {
                background-color: #F9F9F9;
            }
        }
    }

    .pageHeader {
        border-bottom: 1px solid #EEE;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .pageTitle {
        color: #666;
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;

        i {
            position: relative;
            top: 2px;
            margin-right: 10px;
            font-size: 20px;
        }
    }

    .pageMain {
        overflow-y: auto;
        margin: -20px;
        padding: 20px;
        height: calc(100vh - 100px);
    }

    .setterPane {
        border-left: 1px solid #EEE;
        font-size: 14px;
        padding: 10px;
        line-height: 1.5;
        color: #666;
    }

    // 物料列表
    .materials {
        border-right: 1px solid #EEE;

        :global {
            .el-tabs--left .el-tabs__header.is-left {
                margin-right: 0;
            }
        }
    }

    .materialItem {
        box-sizing: border-box;
        float: left;
        width: 50%;
        padding: 10px;
        font-size: 12px;
        text-align: center;
        border-bottom: 1px solid #EEE;
        transition: box-shadow .3s ease;
        border-left: 1px solid #EEE;

        &:hover {
            cursor: pointer;
            box-shadow: 0 6px 16px 0 rgb(0 0 0 / 15%);
        }
    }

    .materialIcon {
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        width: 100%;
        padding-bottom: 100%;
    }

    // 大纲树
    .materialsTreeNode {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        line-height: 26px;
        font-size: 12px;
        min-height: 26px;
        width: 100%;
        padding-left: 5px;
        padding-right: 5px;

        &:hover {
            .materialsTreeNodeBody {
                display: flex;
            }
        }
    }

    .materialsTreeNodeHead {
        display: flex;
    }

    .materialsTreeNodeBody {
        display: none;
        align-items: center;
        height: 26px;
    }

    .materialsTreeIcon {
        display: inline-block;
        width: 20px;
        height: 26px;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center center;
        margin-right: 5px;
    }

    // 模拟器
    .simulator {
        width: 375px;
        height: 680px;
        position: relative;
        margin: 0 auto;
        border: 1px solid #EEE;
        background: #FFF;

        // 设备
        &__device {
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        // 顶部栏
        &__topbar {
            position: relative;
            height: 20px;
            font-weight: bold;
            font-size: 12px;
            text-align: center;
            opacity: .8;

            &::before,
            &::after {
                text-align: left;
                content: '';
                height: 100%;
                position: absolute;
                line-height: 20px;
                top: 0;
                background: url('~@/assets/ios-topbar.png') no-repeat;
                background-size: auto 12px;
                background-position-y: center;
            }

            &::before {
                left: 5px;
                content: '中国移动5G';
                width: 108px;
                background-position-x: 68px;
            }

            &::after {
                right: 5px;
                content: '60%';
                width: 60px;
                background-position-x: right;
            }
        }

        // 画布
        &__canvas {
            flex: 1;
            overflow-y: auto;
        }

        // 工具栏
        &__tools {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate(100%, -50%);
            border: 1px solid #EEE;
            width: 30px;
            border-radius: 0 4px 4px 0;
            background: #FFF;

            a {
                display: block;
                font-size: 16px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
            }
        }
    }

    .setter {
        margin-bottom: 18px;
    }

    .setter__title {
        line-height: 26px;
        padding-bottom: 6px;
        font-size: 14px;
    }
</style>