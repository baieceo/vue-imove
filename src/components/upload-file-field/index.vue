<template>
    <div :class="$style['upload-file']">
        <el-input :value="value" @input="onInput"></el-input>
        <div v-loading="loading" :class="$style['upload-file__uploader']">
            <el-upload :action="action" list-type="picture-card" name="file" :data="data" :on-success="onSuccess"
                :accept="accept" :show-file-list="false" :on-progress="() => loading = true"
                :on-error="() => loading = false">
                <template v-if="value">
                    <img class="el-upload-list__item-thumbnail" :src="value" alt="" />
                    <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview">
                            <i class="el-icon-zoom-in" @click.stop="handlePreview"></i>
                        </span>
                    </span>
                </template>
                <i v-else class="el-icon-plus"></i>
            </el-upload>
        </div>


        <el-dialog title="预览" :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="value" alt="" />
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'UploadFileField',
        props: {
            accept: {
                type: String,
                default: '.jpg, .png, .svg, .gif'
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
        methods: {
            onInput(value) {
                this.$emit('input', value);
            },
            onSuccess(response) {
                this.loading = false;
                this.$emit('input', response.data.url);
            },
            handlePreview() {
                this.dialogVisible = true;
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