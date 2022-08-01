<template>
    <div>
        <el-row style="margin-bottom: 20px;">
            <el-button size="mini" type="primary" @click="onAdd">新建物料</el-button>
        </el-row>

        <el-table v-loading="tableLoading" :data="tableData" size="mini" border style="margin-bottom: 20px;">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column property="title" label="场景标题"></el-table-column>
            <el-table-column property="name" label="场景名称"></el-table-column>
            <el-table-column property="createTime" label="创建时间" width="160"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="gotoRow(scope.$index, tableData)" type="text" size="small">编排
                    </el-button>

                    <el-button @click.native.prevent="editRow(scope.$index, tableData)" type="text" size="small"
                        style="margin-right: 5px;">编辑</el-button>

                    <el-popconfirm title="确定删除此物料吗？" icon="el-icon-info" icon-color="red"
                        @confirm="deleteRow(scope.$index, tableData)">
                        <el-button slot="reference" type="text" size="small">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next, sizes, total" :total="pagination.total"
            :page-size.sync="pagination.pageSize" :current-page.sync="pagination.pageNo" @size-change="fetchTableData"
            @current-change="fetchTableData" style="text-align: center;"></el-pagination>

        <el-drawer :title="formTitle" :visible.sync="formVisible" destroy-on-close :size="500" direction="rtl">
            <div :class="$style['drawer__content']">
                <el-form ref="addForm" :model="form" :rules="rules" size="mini" label-width="120px">
                    <el-form-item prop="componentName" label="物料名称">
                        <el-input v-model="form.componentName"></el-input>
                    </el-form-item>
                    <el-form-item prop="title" label="物料中文名">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item prop="icon" label="物料图标">
                        <el-input v-model="form.icon"></el-input>
                    </el-form-item>
                    <el-form-item prop="screenshot" label="物料缩略图">
                        <el-input v-model="form.screenshot"></el-input>
                        <el-upload action="/api/common/upload" list-type="picture-card" name="files" :show-file-list="false">
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                        <i class="el-icon-zoom-in"></i>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete"
                                        @click="handleDownload(file)">
                                        <i class="el-icon-download"></i>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete"
                                        @click="handleRemove(file)">
                                        <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item prop="npm.package" label="物料库名">
                        <el-input v-model="form.npm.package"></el-input>
                    </el-form-item>
                    <el-form-item prop="npm.main" label="物料路径">
                        <el-input v-model="form.npm.main"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" :class="$style['drawer__footer']">
                    <el-button size="mini" @click="formVisible = false">取 消</el-button>
                    <el-button size="mini" type="primary" @click="handleAddSubmit">确 定</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
    import {
        apiLogicflowAdd,
        apiLogicflowUpdate,
        apiLogicflowList,
        apiLogicflowRemove
    } from '../../services/logicflow';
    import {
        genid
    } from '../../utils/utils';

    export default {
        name: 'ComponentFlowList',
        data() {
            const formDefaultValue = {
                componentName: '', // 物料名称
                title: '', // 物料中文名
                icon: '', // 物料图标
                screenshot: '', // 物料缩略图
                npm: {
                    package: '', // 物料库名,
                    main: '' // 物料路径
                }
            };

            return {
                formVisible: true,
                action: '',
                actionMap: {
                    add: '新建',
                    edit: '编辑'
                },
                form: {
                    ...formDefaultValue
                },
                formDefaultValue,
                rules: {
                    name: [{
                        required: true,
                        message: '物料名称不能为空'
                    }],
                    title: [{
                        required: true,
                        message: '物料标题不能为空'
                    }]
                },
                tableData: [],
                tableLoading: false,
                pagination: {
                    total: 0,
                    pageNo: 1,
                    pageSize: 10
                }
            }
        },
        computed: {
            formTitle() {
                return `${this.actionMap[this.action]}物料`;
            }
        },
        created() {
            this.fetchTableData();
        },
        methods: {
            // 获取数据
            async fetchTableData() {
                try {
                    this.tableLoading = true;

                    const response = await apiLogicflowList({
                        pageNo: this.pagination.pageNo,
                        pageSize: this.pagination.pageSize
                    });

                    this.tableData = response.list.map(row => {
                        row.subLogicList = row.dsl.cells.filter(i => i.data && i.shape === 'imove-start')
                            .map(i => {
                                i.data.id = genid();

                                return i.data;
                            });

                        return row;
                    });
                    this.pagination = {
                        total: response.total,
                        pageNo: response.pageNo,
                        pageSize: response.pageSize
                    };
                } catch (e) {
                    console.error(e);
                } finally {
                    this.tableLoading = false;
                }
            },
            // 编排
            gotoRow(index, rows) {
                const {
                    id
                } = rows[index];

                this.$router.push({
                    name: 'logicDesigner',
                    query: {
                        id
                    }
                });
            },
            // 编辑
            editRow(index, rows) {
                const row = rows[index];

                this.action = 'edit';
                this.formVisible = true;
                this.form = {
                    id: row.id,
                    name: row.name,
                    title: row.title,
                };
            },
            // 删除
            async deleteRow(index, rows) {
                const {
                    id
                } = rows[index];
                const loading = this.$message({
                    type: 'info',
                    iconClass: 'el-inco-loading',
                    message: '删除中，请稍候',
                    duration: 0
                });

                try {
                    await apiLogicflowRemove({
                        id
                    });

                    this.fetchTableData();
                } catch (e) {
                    console.error('删除物料失败', e);
                } finally {
                    loading.close();
                }
            },
            resetForm() {
                this.form = {
                    ...this.formDefaultValue
                };

                if (this.$refs['addForm']) {
                    this.$refs['addForm'].resetFields();
                }
            },
            onAdd() {
                this.action = 'add';
                this.formVisible = true;

                this.resetForm();
            },
            // 新增物料
            handleAddSubmit() {
                // 默认物料数据
                const defaultLogicFlowDsl = {
                    cells: []
                };

                this.$refs['addForm'].validate(async (valid) => {
                    if (valid) {
                        let params;

                        if (this.action === 'add') {
                            params = {
                                ...this.form,
                                dsl: defaultLogicFlowDsl
                            };

                            await apiLogicflowAdd(params);
                        }


                        if (this.action === 'edit') {
                            params = {
                                ...this.form
                            };

                            await apiLogicflowUpdate(params);
                        }

                        this.fetchTableData();

                        this.$message.success('操作成功');

                        this.formVisible = false;
                    } else {
                        console.log('error submit!!');

                        return false;
                    }
                });
            }
        },
        watch: {
            formVisible(value) {
                if (!value) {
                    this.resetForm();
                }
            }
        }
    }
</script>

<style lang="scss" module>
    .drawer {
        &__content {
            height: 100%;
            display: flex;
            flex-direction: column;

            :global {
                .el-form {
                    flex: 1;
                    padding: 0 20px;
                }
            }
        }

        &__footer {
            display: flex;
            justify-content: flex-end;
            padding: 10px 10px;
        }
    }
</style>