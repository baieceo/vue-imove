<template>
    <div>
        <el-row style="margin-bottom: 20px;">
            <el-button size="mini" type="primary" @click="onAdd">新建逻辑</el-button>
        </el-row>

        <el-table v-loading="tableLoading" :data="tableData" size="mini" border style="margin-bottom: 20px;">
            <el-table-column type="index" width="50" label="序号"></el-table-column>
            <el-table-column property="title" label="场景标题"></el-table-column>
            <el-table-column property="name" label="场景名称"></el-table-column>
            <el-table-column property="subLogicList" label="子逻辑">
                <template slot-scope="scope">
                    <template v-if="scope.row.subLogicList && scope.row.subLogicList.length">
                        <div v-for="subLogicFlow in scope.row.subLogicList" :key="subLogicFlow.id">{{subLogicFlow.label}}</div>
                    </template>
                    <template v-else>
                        <div>----</div>
                    </template>
                </template>
            </el-table-column>
            <el-table-column property="createTime" label="创建时间" width="160"></el-table-column>
            <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click.native.prevent="gotoRow(scope.$index, tableData)" type="text" size="small">编排
                    </el-button>

                    <el-button @click.native.prevent="editRow(scope.$index, tableData)" type="text" size="small"
                        style="margin-right: 5px;">编辑</el-button>

                    <el-popconfirm title="确定删除此逻辑吗？" icon="el-icon-info" icon-color="red"
                        @confirm="deleteRow(scope.$index, tableData)">
                        <el-button slot="reference" type="text" size="small">删除</el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next, sizes, total" :total="pagination.total"
            :page-size.sync="pagination.pageSize" :current-page.sync="pagination.pageNo" @size-change="fetchTableData"
            @current-change="fetchTableData" style="text-align: center;"></el-pagination>

        <el-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="500px" destroy-on-close>
            <el-form ref="addForm" :model="form" :rules="rules" size="mini" label-width="120px">
                <el-form-item prop="name" label="场景名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="title" label="场景标题">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="handleAddSubmit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        apiLogicflowAdd,
        apiLogicflowUpdate,
        apiLogicflowList,
        apiLogicflowRemove
} from '../../services/logicflow';
import { genid } from '../../utils/utils';

    export default {
        name: 'LogicFlowList',
        data() {
            const formDefaultValue = {
                name: '',
                title: ''
            };

            return {
                dialogFormVisible: false,
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
                        message: '逻辑名称不能为空'
                    }],
                    title: [{
                        required: true,
                        message: '逻辑标题不能为空'
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
                return `${this.actionMap[this.action]}逻辑`;
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
                this.dialogFormVisible = true;
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
                    console.error('删除逻辑失败', e);
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
                this.dialogFormVisible = true;

                this.resetForm();
            },
            // 新增逻辑
            handleAddSubmit() {
                // 默认逻辑数据
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

                        this.dialogFormVisible = false;
                    } else {
                        console.log('error submit!!');

                        return false;
                    }
                });
            }
        },
        watch: {
            dialogFormVisible(value) {
                if (!value) {
                    this.resetForm();
                }
            }
        }
    }
</script>