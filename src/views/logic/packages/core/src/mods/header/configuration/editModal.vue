<template>
<el-dialog class="editModal" :visible="visible" title="配置" width="450px" :before-close="onCancel">
    <el-form ref="formRef" label-width="8em" label-position="right" :model="formValues" size="mini">
        <el-form-item label="本地连接 IP" prop="ip" :rules="makeRules(IP_REGEX, 'IP格式不合法' )">
            <el-input v-model="formValues.ip" />
        </el-form-item>
        <el-form-item label="本地连接端口" prop="port" :rules="makeRules(PORT_REGEX, '端口格式不合法' )">
            <el-input v-model="formValues.port" />
        </el-form-item>
        <el-form-item label="'NPM 源" prop="npmRegistry" :rules="makeRules(NPM_REGISTRY_REGEX, 'NPM 源地址不合法' )">
            <el-input v-model="formValues.npmRegistry" />
        </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
        <el-button @click="onCancel" size="mini">取 消</el-button>
        <el-button type="primary" @click="onClickOk" size="mini">保 存</el-button>
    </span>
</el-dialog>
</template>

<style lang="scss" scoped>
@import './index.module.scss';
</style>

<script>
import {
    getLocalConfig,
    updateLocalConfig
} from '../../../api';

const PORT_REGEX = /^\d{1,5}$/;
const IP_REGEX = /^(localhost)|(((2(5[0-5]|[0-4]\d))|[01]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[01]?\d{1,2})){3})$/;
const NPM_REGISTRY_REGEX = /^https?:\/\//; // 简单 URL 检查

const makeRules = (regex, errTip) => {
    return [{
            required: true,
            message: '不能为空!'
        },
        {
            validator: (_, val) =>
                regex.test(val) ? Promise.resolve() : Promise.reject(errTip),
        },
    ];
};

export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            formValues: getLocalConfig(),
            PORT_REGEX,
            IP_REGEX,
            NPM_REGISTRY_REGEX
        }
    },
    methods: {
        onCancel() {
            this.$emit('cancel');
        },
        onClickOk() {
            this.$refs['formRef'].validate((valid) => {
                if (valid) {
                    updateLocalConfig(this.formValues);

                    this.$emit('ok', this.formValues);
                } else {
                    console.log(valid);
                    return false;
                }
            });
        },
        makeRules
    }
}
</script>
