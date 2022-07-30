<template>
    <div :class="$style['events']">
        <div :class="$style['events__head']">
            <el-dropdown size="mini" @command="handleEventCommand">
                <el-button type="primary" size="mini">
                    添加事件<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item v-for="item in types" :key="item.name" :command="item.name">{{item.title}}
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div :class="$style['events__body']">
            <div v-for="(event, eventIndex) in currentNode.events" :key="event.id" :class="$style['event']">
                <div :class="$style['event__head']">
                    <h3 :class="$style['event__title']">事件{{eventIndex + 1}}：{{event.title}}</h3>
                    <div :class="$style['event__tools']">
                        <el-button size="mini" type="text" icon="el-icon-delete"></el-button>
                    </div>
                </div>
                <div :class="$style['event__body']">
                    <component :key="event.id" :is="event.name" v-bind.sync="currentNode.events[eventIndex]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import events, {
        types
    } from './index.js';

    export default {
        name: 'Events',
        inject: ['env', 'getCurrentNode'],
        components: {
            ...events
        },
        data() {
            return {
                types
            }
        },
        computed: {
            currentNode() {
                return this.getCurrentNode();
            },
        },
        methods: {
            // 生成uuid
            genUuid(prefix = '') {
                let str = '';

                str = Math.random().toString(36).substr(3);
                str += Date.now().toString(16).substr(4);

                return prefix + str;
            },
            handleEventCommand(command) {
                const event = {
                    ...types.find(e => e.name === command)
                };

                event.id = this.genUuid('event_');

                // 默认值
                if (event.default !== undefined) {
                    event.value = event.default;
                }

                this.currentNode.events.push(event);
            }
        }
    };
</script>

<style lang="scss" module>
    .events {
        &__head {
            padding-bottom: 15px;
        }

        &__body {
            padding-bottom: 20px;
        }
    }

    .event {
        &__head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #409eff;
            background: #ecf5ff;
            border: 1px solid #b3d8ff;
            padding: 0 10px;
            border-radius: 4px;
            margin-bottom: 10px;
        }

        &__body {
            font-size: 12px;
            padding-bottom: 20px;
        }

        &__title {
            font-size: 12px;
            font-weight: 400;
        }

        &__tools {}
    }
</style>