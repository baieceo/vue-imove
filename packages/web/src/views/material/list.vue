<template>
    <div>
        <el-row style="margin-bottom: 20px;">
            <el-button size="mini" type="primary" @click="onAdd">新建物料</el-button>
        </el-row>

        <el-table v-loading="tableLoading" :data="tableData" size="mini" border style="margin-bottom: 20px;">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column property="componentName" label="名称"></el-table-column>
            <el-table-column property="title" label="中文名"></el-table-column>
            <el-table-column property="icon" label="图标" width="60">
                <template slot-scope="scope">
                    <a :href="scope.row.icon" target="_blank"><img :src="scope.row.icon" alt=""
                            style="height: 23px; object-fit: contain;" /></a>
                </template>
            </el-table-column>
            <el-table-column property="screenshot" label="缩略图" width="60">
                <template slot-scope="scope">
                    <a :href="scope.row.icon" target="_blank"><img :src="scope.row.screenshot" alt=""
                            style="height: 23px; object-fit: contain;" /></a>
                </template>
            </el-table-column>
            <el-table-column property="npm.package" label="库名"></el-table-column>
            <el-table-column property="npm.main" label="路径">
                <template slot-scope="scope">
                    <el-link :href="scope.row.npm.main" type="primary" target="_blank" :underline="false">
                        {{scope.row.npm.main}}</el-link>
                </template>
            </el-table-column>
            <el-table-column property="status" label="状态" width="60">
                <template slot-scope="scope">
                    <span>
                        {{scope.row.status === 'enabled' ? '启用' : '禁用'}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column property="createTime" label="创建时间" width="140"></el-table-column>
            <el-table-column fixed="right" label="操作" width="80">
                <template slot-scope="scope">
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
                <el-form ref="materialForm" :model="form" :rules="rules" size="mini" label-width="120px">
                    <el-form-item prop="componentName" label="名称">
                        <el-input v-model="form.componentName"></el-input>
                    </el-form-item>
                    <el-form-item prop="title" label="中文名">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item prop="icon" label="图标">
                        <upload-file-field v-model="form.icon" />
                    </el-form-item>
                    <el-form-item prop="screenshot" label="缩略图">
                        <upload-file-field v-model="form.screenshot" />
                    </el-form-item>
                    <el-form-item prop="npm.package" label="库名">
                        <el-input v-model="form.npm.package"></el-input>
                    </el-form-item>
                    <el-form-item prop="npm.main" label="路径">
                        <upload-file-field v-model="form.npm.main"
                            :data="{path: `materials/${form.npm.package}`, rename: false}" accept=".js"
                            :before-upload="onNpmMainBeforeUpload" />
                    </el-form-item>
                    <el-form-item prop="status" label="状态">
                        <el-switch v-model="form.status" active-value="enabled" inactive-value="disabled" />
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
        apiMaterialAdd,
        apiMaterialUpdate,
        apiMaterialList,
        apiMaterialRemove
    } from '../../services/material';
    import UploadFileField from '../../components/upload-file-field/index.vue';

    // 表单默认值
    const formDefaultValue = {
        componentName: '', // 物料名称
        title: '', // 物料中文名
        icon: '', // 物料图标
        screenshot: '', // 物料缩略图
        npm: {
            package: '', // 物料库名,
            main: '' // 物料路径
        },
        status: 'enabled' // 状态
    };

    export default {
        name: 'ComponentFlowList',
        components: {
            UploadFileField
        },
        data() {
            return {
                formVisible: false,
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
                    componentName: [{
                        required: true,
                        message: '名称不能为空'
                    }],
                    title: [{
                        required: true,
                        message: '标题不能为空'
                    }],
                    icon: [{
                        required: true,
                        message: '图标不能为空'
                    }],
                    screenshot: [{
                        required: true,
                        message: '缩略图不能为空'
                    }],
                    'npm.package': [{
                        required: true,
                        message: '库名不能为空'
                    }],
                    'npm.main': [{
                        required: true,
                        message: '路径不能为空'
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

                    const response = await apiMaterialList({
                        pageNo: this.pagination.pageNo,
                        pageSize: this.pagination.pageSize
                    });

                    this.tableData = response.list;
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
            // 编辑
            editRow(index, rows) {
                const row = rows[index];

                this.action = 'edit';
                this.formVisible = true;
                this.form = {
                    id: row.id,
                    ...row
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
                    await apiMaterialRemove({
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

                if (this.$refs['materialForm']) {
                    this.$refs['materialForm'].resetFields();
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
                this.$refs['materialForm'].validate(async (valid) => {
                    if (valid) {
                        let params;

                        if (this.action === 'add') {
                            params = {
                                ...this.form,
                            };

                            await apiMaterialAdd(params);
                        }

                        if (this.action === 'edit') {
                            params = {
                                ...this.form
                            };

                            await apiMaterialUpdate(params);
                        }

                        this.fetchTableData();

                        this.$message.success('操作成功');

                        this.formVisible = false;
                    } else {
                        console.log('error submit!!');

                        return false;
                    }
                });
            },
            // 上传物料前检查
            async onNpmMainBeforeUpload() {
                return new Promise((resolve, reject) => {
                    this.$refs['materialForm'].validateField('npm.package', err => {
                        if (err) {
                            return reject();
                        }

                        resolve();
                    });
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