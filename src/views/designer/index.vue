<template>
    <el-container :class="$style.pageContainer">
        <el-header :class="$style.pageHeader">页面设计</el-header>
        <el-container>
            <el-aside :class="$style.materials" width="80px">
                <draggable v-model="materials" :group="{ name: 'materials', pull: false, put: false }" :sort="false"
                    :clone="onCloneMaterial" @end="onDraggableEnd">
                    <div v-for="material in materials" :key="material.componentName" :class="$style.materialItem">
                        <div :class="$style.materialIcon" :style="{backgroundImage: `url(${material.icon})`}" />
                        {{material.title}}
                    </div>
                </draggable>
            </el-aside>
            <el-main>
                <div @click="onSimulatorClick">
                    <draggable v-loading="loading" :class="$style.simulator" :group="{ name: 'simulator' }">
                        <template v-if="!loading">
                            <component v-for="component in projectSchema.componentsTree" :is="component.componentName"
                                :key="component.id" v-bind="component.props" :children="component.children" />
                        </template>
                    </draggable>
                </div>
            </el-main>
            <el-aside :class="$style.setterPane" width="250px">Aside</el-aside>
        </el-container>
    </el-container>
</template>

<script>
    import Vue from 'vue';
    import projectSchema from './projectSchema';

    export default {
        name: 'Designer',
        provide: {
            env: 'design'
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
                // 选中组件
                selectedComponent: null
            }
        },
        async created() {
            try {
                this.loading = true;

                await this.fetchMaterials();

                await this.registerMaterials();

                this.loading = false;
            } catch (e) {
                console.error('创建错误', e);
            }
        },
        methods: {
            // 生成uuid
            genUuid(prefix = '') {
                let str = '';

                str = Math.random().toString(36).substr(3);
                str += Date.now().toString(16).substr(4);

                return prefix + str;
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
            // 克隆物料
            onCloneMaterial(material) {
                this.cloneMaterial = {
                    // ...material,

                    id: this.genUuid(`node_`),
                    props: {},
                    children: [],
                    componentName: material.componentName,
                }
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
            // 拖拽结束
            onDraggableEnd(e) {
                const {
                    originalEvent: {
                        target: {
                            dataset: {
                                id
                            }
                        }
                    }
                } = e;
                const projectSchema = {
                    ...this.projectSchema
                };

                const target = this.findComponentById(projectSchema.componentsTree, id);

                if (target && target.children) {
                    target.children.push({
                        ...this.cloneMaterial
                    });
                }

                this.projectSchema = {
                    ...projectSchema
                };
            },
            // 点击模拟器
            onSimulatorClick(e) {
                let {
                    target
                } = e;

                while (!target.dataset.id) {
                    target = target.parentNode;
                }

                const {
                    id
                } = target.dataset;

                const component = this.findComponentById(projectSchema.componentsTree, id);

                if (component) {
                    this.selectedComponent = component;

                    console.log(111, component);
                }
            }
        }
    }
</script>

<style lang="scss" module>
    .pageContainer {
        height: 100vh;
    }

    .pageHeader {
        border-bottom: 1px solid #EEE;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .materials {
        border-right: 1px solid #EEE;
    }

    .setterPane {
        border-left: 1px solid #EEE;
    }

    .materialItem {
        padding: 10px;
        font-size: 12px;
        text-align: center;
        border-bottom: 1px solid #EEE;
        transition: box-shadow .3s ease;

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

    .simulator {
        width: 100%;
        height: 100%;
    }
</style>