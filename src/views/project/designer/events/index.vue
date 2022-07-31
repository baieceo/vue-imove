<template>
    <div :class="$style['cards']">
        <div :class="$style['cards__head']">
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
        <div :class="$style['cards__body']">
            <div :class="$style['card']" v-for="(event, eventIndex) in currentNode.events" :key="event.id">
                <div :class="$style['card__head']">
                    <h3 :class="$style['card__title']">{{event.title}}</h3>
                    <div :class="$style['card__tools']">
                        <el-button size="mini" type="text" icon="el-icon-delete"
                            @click="() => handleEventRemove(event.id)"></el-button>
                    </div>
                </div>
                <div :class="$style['card__body']">
                    <component :key="event.id" :is="event.name" v-bind.sync="currentNode.events[eventIndex]" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {genid} from '../../../../utils/utils';
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
            // 事件命令
            handleEventCommand(command) {
                const event = {
                    ...types.find(e => e.name === command)
                };

                event.id = `event_${genid()}`;

                // 默认值
                if (event.default !== undefined) {
                    event.value = event.default;
                }

                this.currentNode.events.push(event);
            },
            // 删除事件
            handleEventRemove(eventId) {
                const index = this.currentNode.events.findIndex(event => event.id === eventId);

                this.currentNode.events.splice(index, 1);
            }
        }
    };
</script>

<style lang="scss" module>
    @import '../common.module.scss';
</style>