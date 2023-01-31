<template>
    <el-dialog :class="['editModal', isConfig && 'editModalConfig']" :width="modalWidth" :title="title"
        :fullscreen="isConfig" :visible="visible" :before-close="onCancel">
        <template v-if="visible">
            <template v-if="isConfig">
                <el-tabs type="card" v-model="tab">
                    <el-tab-pane class="tabPane" label="可视化" name="VisualTab">
                        <div class="form">
                            <Generator ref="formRef" class="logicFormGenerator"
                                container-class="logicFormGeneratorContainer"
                                tool-bar-box-class="logicFormGeneratorToolBarBoxClass"
                                content-wrap-class="logicFormGeneratorContentWrap"
                                content-box-class="logicFormGeneratorContentBox"
                                content-form-class="logicFormGeneratorContentFormClass"
                                right-form-class="logicFormGeneratorRightForm" :hide-editor-header="true">
                                <template #content-toolbar>
                                    <el-row type="flex" class="logicFormGeneratorContentToolBar">
                                        <el-button size="mini" @click="onImportSchema">导入</el-button>
                                        <el-button size="mini" type="primary" @click="onExportSchema">导出schema
                                        </el-button>
                                    </el-row>
                                </template>
                            </Generator>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane class="tabPane" label="JSON" name="JsonTab">
                        <div class="configInput">
                            <CodeEditor ref="configCodeEditor" width="100%" custom-class="configInputCodeEditor"
                                :options="codeEditorOptions" :value="json" @change="onJsonChange" />
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </template>

            <template v-else>
                <div style="margin: 0 -20px;">
                    <CodeEditor width="100%" custom-class="depInputCodeEditor" :options="codeEditorOptions"
                        :value="json" @change="onJsonChange" />
                </div>

            </template>

            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="onCancel">取 消</el-button>
                <el-button size="mini" type="primary" @click="onClickOk">保 存</el-button>
            </span>
        </template>

    </el-dialog>
</template>

<style lang="scss" scoped>
    @import './index.module.scss';
</style>

<script>
    import Generator from '../../../../../../../../schema/generator/views/editor/Editor.vue';
    import {
        compData
    } from './json';

    import CodeEditor from '../../../../components/codeEditor';

    const JSON_TAB = 'JsonTab';
    const VISUAL_TAB = 'VisualTab';

    export default {
        components: {
            Generator,
            CodeEditor
        },
        props: {
            visible: {
                type: Boolean
            },
            title: {
                type: String
            },
            value: {
                type: String
            },
            ok: {
                type: Function,
                default () {
                    return () => {};
                }
            },
            cancel: {
                type: Function,
                default () {
                    return () => {};
                }
            },
            defaultSchema: {
                type: Object
            },
            isConfig: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                json: '',
                tab: VISUAL_TAB,
                compData,
                codeEditorOptions: {
                    language: 'json'
                }
            };
        },
        computed: {
            modalWidth() {
                return this.isConfig ? '1200px' : '800px';
            }
        },
        methods: {
            defaultValue() {
                if (this.defaultSchema && Object.keys(this.defaultSchema).length > 0) {
                    const codeObj = {
                        schema: Object.assign({}, this.defaultSchema),
                        displayType: 'row',
                        showDescIcon: true,
                    };

                    return codeObj;
                }
            },
            tabChange(tab) {
                this.$nextTick(() => {
                    if (tab === JSON_TAB) {
                        this.tab = JSON_TAB;

                        this.form2code();
                    }

                    if (tab === VISUAL_TAB) {
                        this.tab = VISUAL_TAB;

                        this.code2form();
                    }
                });

            },
            form2code() {
                const formSchema = this.$refs['formRef'] && this.$refs['formRef'].getExportCode();

                this.json = JSON.stringify(formSchema, null, 2);
            },
            code2form() {
                try {
                    this.$refs['formRef'] && this.$refs['formRef'].importCode(this.json);
                } catch (error) {
                    console.log(
                        "can't parse code string to form schema, the error is:",
                        error.message,
                    );
                }
            },
            onExportSchema() {
                this.$refs['formRef'].handleExportSchema();
            },
            onImportSchema() {
                this.$refs['formRef'].handleImportSchema();
            },
            onJsonChange(newJson = '') {
                this.json = newJson;

                if (this.isConfig) {
                    this.code2form();
                }
            },
            onCancel() {
                this.$emit('cancel');
            },
            onClickOk() {
                try {
                    if (this.isConfig) {
                        if (this.tab === VISUAL_TAB && this.$refs['formRef']) {
                            const value = this.$refs['formRef'].getValue();

                            this.json = JSON.stringify(value, null, 2);

                            this.$emit('change-schema', this.$refs['formRef'].getValue().schema);

                            this.$emit('ok', JSON.stringify(value));
                        } else {
                            this.$emit('change-schema', JSON.parse(this.json).schema);

                            this.$emit('ok', this.json);
                        }
                    } else {
                        JSON.parse(this.json);

                        this.$emit('ok', this.json);
                    }
                } catch (error) {
                    this.$message.error('内容必须是合法json');

                    console.log('save failed, the error is:', error.message);
                }
            },
            schema2Code(schemaCode) {
                return JSON.stringify(Object.assign({}, {
                        "schema": {
                            "type": "object",
                            "required": [],
                            "properties": {},
                            "ui:order": []
                        },
                        "uiSchema": {},
                        "formFooter": {
                            "show": false
                        },
                        "formProps": {
                            "labelWidth": "100px",
                            "labelSuffix": "："
                        }
                    },
                    JSON.parse(schemaCode),
                ), null, 2);
            }
        },
        watch: {
            visible(visible) {
                if (visible) {
                    this.json = this.value;
                } else {
                    this.json = '';
                    this.tab = VISUAL_TAB;
                }

                this.$nextTick(() => {
                    if (!visible) return;

                    const code = this.schema2Code(this.json);

                    if (visible && this.tab === VISUAL_TAB && this.isConfig) {
                        this.$refs['formRef'].importCode(code);
                    }

                    if (visible && this.tab === JSON_TAB && this.isConfig) {
                        this.$refs['configCodeEditor'].setValue(code);
                    }
                });
            },
            tab(value) {
                this.tabChange(value);

                if (value === JSON_TAB) {
                    this.json = JSON.stringify(JSON.parse(this.json), null, 2);

                    this.$nextTick(() => {
                        this.$refs['configCodeEditor'].destroy();
                        this.$refs['configCodeEditor'].init();
                    });
                }
            }
        }
    }
</script>