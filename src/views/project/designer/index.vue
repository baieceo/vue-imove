<template>
    <el-container :class="$style.pageContainer">
        <el-header :class="$style.pageHeader">
            <h1 :class="$style.pageTitle"><i class="el-icon-menu"></i>{{projectTitle}}</h1>
            <div :class="$style.pageHeaderTools">
                <el-button @click="schemaVisible = true" size="mini">schema</el-button>
                <el-popconfirm title="确定发布吗？" @confirm="onPublish">
                    <el-button slot="reference" type="primary" size="mini" plain>发布</el-button>
                </el-popconfirm>
                <el-button type="primary" @click="onUpdate " size="mini">保存</el-button>
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
                <!-- 模拟器 start -->
                <el-scrollbar :class="$style['pageMain']" style="height: calc(100vh - 60px);">
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
                </el-scrollbar>
                <!-- 模拟器 end -->
            </el-main>
            <el-aside :class="$style.setterPane" width="350px">
                <el-tabs v-model="setterTabName" style="height: 100%">
                    <!-- 属性 start -->
                    <el-tab-pane label="属性" name="props">
                        <el-scrollbar style="height: calc(100vh - 160px);">
                            <div v-if="currentNode.id">
                                <Setters />
                            </div>
                            <template v-else>
                                <el-empty description="请选择节点" />
                            </template>
                        </el-scrollbar>
                    </el-tab-pane>
                    <!-- 属性 end -->
                    <!-- 事件 start -->
                    <el-tab-pane label="事件" name="events">
                        <el-scrollbar style="height: calc(100vh - 160px);">
                            <template v-if="currentNode.id">
                                <Events />
                            </template>
                            <template v-else>
                                <el-empty description="请选择节点" />
                            </template>
                        </el-scrollbar>
                    </el-tab-pane>
                    <!-- 事件 end -->
                    <!-- 逻辑 start -->
                    <el-tab-pane label="逻辑" name="logicFlows">
                        <el-scrollbar style="height: calc(100vh - 160px);">
                            <template v-if="currentNode.id">
                                <LogicFlows />
                            </template>
                            <template v-else>
                                <el-empty description="请选择节点" />
                            </template></el-scrollbar>
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
    import {
        genid
    } from '../../../utils/utils';
    import Setters from './setters/index.vue';
    import Events from './events/index.vue';
    import LogicFlows from './logicFlows/index.vue';
    import CodeEditor from '../../logic/packages/core/src/components/codeEditor';
    import {
        apiProjectUpdate,
        apiProjectQuery,
        apiProjectPublish
    } from '../../../services/project';

    export default {
        name: 'Designer',
        components: {
            Setters,
            Events,
            LogicFlows,
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
                // 项目名称
                projectTitle: '',
                // 项目schema
                projectSchema: {
                    componentsMap: [],
                    componentsTree: []
                },
                // 环境：design/runtime
                env: 'design',
                // 克隆物料
                cloneMaterial: {},
                // 选中节点
                currentNode: {},
                // 当前时间
                nowTime: '',
                // schema可见
                schemaVisible: false,
                // setter激活标签
                setterTabName: 'events',
            }
        },
        computed: {
            id() {
                return this.$route.query.id;
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
            // 获取项目数据
            async fetchData() {
                const loading = this.$message({
                    type: 'info',
                    iconClass: 'el-icon-loading',
                    message: '获取数据中，请稍候',
                    duration: 0
                });

                try {
                    const {
                        title,
                        schema
                    } = await apiProjectQuery({
                        id: this.id
                    });

                    this.projectTitle = title;
                    this.projectSchema = schema;
                } catch (e) {
                    console.error('获取项目数据异常', e);
                } finally {
                    loading.close();
                }
            },
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
            // 根据id查找组件
            findComponentById(components, id) {
                const findComponent = (components, id) => {
                    if (!(components instanceof Array)) return null;

                    for (let i in components) {
                        const item = components[i];

                        if (item.id === id) return item;

                        if (item.children) {
                            const target = findComponent(item.children, id);

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
                const componentData = {
                    ...(await component()).default
                };

                // 解析物料属性
                const props = {};

                for (let key in componentData.props) {
                    props[key] = [Object, Array].includes(componentData.props[key].type) ?
                        componentData.props[key].default() :
                        componentData.props[key].default;
                }

                this.cloneMaterial = {
                    // ...material,
                    id: `node_${genid()}`,
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
                const cloneMaterial = {
                    ...this.cloneMaterial
                };

                if (target && target.children) {
                    target.children.push(cloneMaterial);
                }

                this.currentNode = cloneMaterial;

                this.projectSchema = {
                    ...projectSchema
                };

                this.$nextTick(this.$forceUpdate);
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

                const currentNode = this.findComponentById(this.projectSchema.componentsTree, target.id);

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

                    this.$nextTick(() => {
                        this.currentNode = this.findComponentById(this.projectSchema.componentsTree, this
                            .currentNode.id);

                        this.$forceUpdate();
                    });
                } catch (err) {
                    // cancel log to avoid wasting Console outputs
                }
            },
            // 更新
            async onUpdate() {
                const {
                    query: {
                        id
                    }
                } = this.$route;
                const loading = this.$message({
                    type: 'info',
                    iconClass: 'el-icon-loading',
                    message: '保存中，请稍候',
                    duration: 0
                });

                try {
                    const params = {
                        id,
                        schema: {
                            ...this.projectSchema
                        }
                    };

                    await apiProjectUpdate(params);

                    this.$message.success('保存成功');
                } catch (e) {
                    console.error('保存异常', e);
                } finally {
                    loading.close();
                }
            },
            // 发布
            async onPublish() {
                const loading = this.$message({
                    type: 'info',
                    iconClass: 'el-icon-loading',
                    message: '发布中，请稍候',
                    duration: 0
                });

                try {
                    await apiProjectPublish({
                        id: this.id
                    });
                } catch (e) {
                    console.log('发布异常', e);
                } finally {
                    loading.close();
                }
            }
        },
        watch: {
            'currentNode.id'(value) {
                this.$nextTick(() => {
                    // 设置大纲树选中
                    this.$refs['materialsTree'].setCurrentKey(value);
                });
            },
            '$route.query.id': {
                handler: 'fetchData',
                immediate: true
            },
            schemaVisible(value) {
                if (value) {
                    this.$nextTick(() => {
                        // 设置代码编辑器代码
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

    .pageHeaderTools {
        :global {
            .el-button {
                margin-left: 10px;
            }
        }
    }

    .pageMain {
        margin: -20px;

        :global {
            .el-scrollbar__wrap {
                overflow-x: hidden;
            }
        }
    }

    .setterPane {
        border-left: 1px solid #EEE;
        font-size: 14px;
        padding: 0 10px;
        line-height: 1.5;
        color: #666;

        :global {
            .el-scrollbar__wrap {
                overflow-x: hidden;
            }

            .el-scrollbar__view {
                padding-right: 1px;
            }

            .el-tabs__header {
                margin-bottom: 0;
            }
        }
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
        margin: 20px auto;
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
</style>