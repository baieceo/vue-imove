<template>
    <div class="container">
        <Generator ref="formRef" class="formGenerator" container-class="formGeneratorContainer"
            tool-bar-box-class="formGeneratorToolBarBoxClass" tool-bar-wrap-class="formToolBarWrap"
            content-wrap-class="formGeneratorContentWrap" content-box-class="formGeneratorContentBox"
            content-form-class="formGeneratorContentFormClass" right-form-class="formGeneratorRightForm"
            drag-area-class="formGeneratorDragArea" :hide-editor-header="true">
            <template #content-toolbar>
                <el-row type="flex" class="formGeneratorContentToolBar">
                    <div>表单生成</div>
                    <div>
                        <el-button size="mini" @click="onImportSchema">导入</el-button>
                        <el-button size="mini" type="primary" @click="onExportSchema">导出schema
                        </el-button>
                    </div>
                </el-row>
            </template>
        </Generator>
    </div>
</template>

<style lang="scss" scoped>
    @import './index.module.scss';
</style>

<script>
    import Generator from './generator/views/editor/Editor.vue';

    export default {
        components: {
            Generator
        },
        methods: {
            onExportSchema() {
                this.$refs['formRef'].handleExportSchema();
            },
            onImportSchema() {
                this.$refs['formRef'].handleImportSchema();
            },
        }
    }
</script>