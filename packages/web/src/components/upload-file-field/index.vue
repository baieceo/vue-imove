<template>
    <div :class="$style['upload-file']">
        <el-input :value="value" @input="onInput"></el-input>
        <div v-loading="loading" :class="$style['upload-file__uploader']">
            <el-upload :action="action" list-type="picture-card" name="file" :data="data" :on-success="onSuccess"
                :accept="accept" :show-file-list="false" :on-progress="() => loading = true"
                :on-error="() => loading = false" :before-upload="beforeUpload">
                <template v-if="value && isImage">
                    <img class="el-upload-list__item-thumbnail" :src="value" alt="" />
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview">
                            <i class="el-icon-zoom-in" @click.stop="handlePreview"></i>
                        </span>
                    </span>
                </template>
                <template v-if="value && !isImage">
                    <span>{{filename}}</span>
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview">
                            <i class="el-icon-zoom-in" @click.stop="handlePreview"></i>
                        </span>
                    </span>
                </template>
                <i v-if="!value" class="el-icon-plus"></i>
            </el-upload>
        </div>

        <el-dialog title="预览" :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="value" alt="" />
        </el-dialog>
    </div>
</template>

<script>
    const imageExtName = ['.jpg', '.png', '.svg', '.gif'];

    export default {
        name: 'UploadFileField',
        props: {
            beforeUpload: Function,
            accept: {
                type: String,
                default: imageExtName.join(',')
            },
            action: {
                type: String,
                default: '/api/common/upload'
            },
            name: {
                type: String,
                default: 'file'
            },
            size: {
                type: String,
                default: 'mini'
            },
            data: {
                type: Object,
                default () {
                    return {
                        path: 'images'
                    }
                }
            },
            value: String
        },
        data() {
            return {
                loading: false,
                dialogVisible: false
            }
        },
        computed: {
            filename() {
                const [, filename = this.value] = this.value.match(/(\w+\.\w+)[^\\.]*$/) || [];

                return filename;
            },
            extname() {
                const [extname = this.filename] = this.filename.match(/\.\w+$/) || [];

                return extname;
            },
            isImage() {
                if (imageExtName.includes(this.extname)) {
                    return true;
                }

                return false;
            }
        },
        methods: {
            onInput(value) {
                this.$emit('input', value);
            },
            onSuccess(response) {
                this.loading = false;

                this.$emit('input', response.data.url);
            },
            handlePreview() {
                if (this.isImage) {
                    this.dialogVisible = true;
                } else {
                    window.open(this.value);
                }
            },
            handleRemove() {
                this.$emit('input', '');
            }
        }
    }
</script>

<style lang="scss" module>
    $upload-file__card-width: 80px;
    $upload-file__card-height: 80px;

    .upload-file {
        &__uploader {
            position: relative;
            width: $upload-file__card-width;
            height: $upload-file__card-height;
        }

        :global {
            .el-input {
                margin-bottom: 18px;
            }

            .el-upload--picture-card {
                position: relative;
                width: $upload-file__card-width;
                height: $upload-file__card-height;
                line-height: $upload-file__card-height;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .el-upload-list__item-actions {
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: 0 5px;
                    line-height: 20px;

                    i {
                        font-size: 14px;
                        color: #409eff;
                        opacity: .5;

                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }
</style>