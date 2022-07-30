<template>
    <div>
        <el-card shadow="never" style="margin-bottom: 20px;">
            <el-button size="mini" type="primary" @click="dialogFormVisible = true">新建项目</el-button>
        </el-card>

        <template v-if="tableData.length">
            <el-table :data="tableData" size="mini">
                <el-table-column type="index" width="50"></el-table-column>
                <el-table-column property="title" label="标题" width="120"></el-table-column>
                <el-table-column property="name" label="名称"></el-table-column>
                <el-table-column property="createTime" label="时间" width="120"></el-table-column>
                <el-table-column fixed="right" label="操作" width="120">
                    <template slot-scope="scope">
                        <el-button @click.native.prevent="editRow(scope.$index, tableData)" type="text" size="small">
                            编辑
                        </el-button>
                        <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template v-else>
            <el-empty description="暂无数据"></el-empty>
        </template>

        <el-dialog title="新建项目" :visible.sync="dialogFormVisible" width="500px" destroy-on-close>
            <el-form ref="addForm" :model="form" :rules="rules" size="mini" label-width="120px">
                <el-form-item prop="name" label="项目名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item prop="title" label="项目标题">
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
        apiProjectAdd,
        apiProjectList
    } from '../../services/project';

    export default {
        name: 'ProjectList',
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    title: ''
                },
                rules: {
                    name: [{
                        required: true,
                        message: '项目名称不能为空'
                    }],
                    title: [{
                        required: true,
                        message: '项目标题不能为空'
                    }]
                },
                tableData: []
            }
        },
        created() {
            this.fetchData();
        },
        methods: {
            // 获取数据
            async fetchData() {
                try {
                    const response = await apiProjectList();

                    this.tableData = response.list;
                } catch (e) {
                    console.error(e);
                }
            },
            // 编辑
            editRow(index, rows) {
                const row = rows[index];

                console.log('编辑', row);
            },
            // 删除
            deleteRow(index, rows) {
                const row = rows[index];

                console.log('删除', row);
            },
            // 新增确定
            handleAddSubmit() {
                this.$refs['addForm'].validate(async (valid) => {
                    if (valid) {
                        await apiProjectAdd(this.form);

                        this.fetchData();

                        this.$message.success('操作成功');

                        this.dialogFormVisible = false;
                    } else {
                        console.log('error submit!!');

                        return false;
                    }
                });
            }
        }
    }
</script>