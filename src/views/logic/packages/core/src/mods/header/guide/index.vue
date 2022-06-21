<template>
    <div>
        <el-tooltip effect="dark" content="帮助指引" placement="top">
            <el-button type="text" icon="icon-sam icon-sam-iconfontlipinduihuanbangzhu" size="mini"
                @click="onOpenModal"></el-button>
        </el-tooltip>
        <GuideModal :visible="modalVisible" @close="onCloseModal" />
    </div>
</template>

<script>
    import GuideModal from './guideModal';

    export default {
        components: {
            GuideModal
        },
        data() {
            return {
                modalVisible: false
            }
        },
        methods: {
            onOpenModal() {
                this.modalVisible = true;
            },
            onCloseModal() {
                this.modalVisible = false;
            }
        }
    }
</script>