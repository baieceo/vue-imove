<template>
  <div class="container">
    <render-tool-bar :level="level" @level-change="onChangeLevel" @filter-change="onChangeFilter" @clear="onClickClear"
      class="toolBar" />
    <el-tabs type="card" v-model="activeKey" class="consoleTabs">
      <el-tab-pane label="控制台" name="log">
        <render-log-panel :log-list="logList" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    hijackMap,
    Helper
  } from './common';
  import RenderToolBar from './RenderToolBar.vue';
  import RenderLogPanel from './RenderLogPanel.vue';

  const hijackConsole = function (method) {
    window.console[method] = (...args) => {
      hijackMap[method].originMethod(...args);

      this.cache.allLogs = this.cache.allLogs.concat({
        type: method,
        data: args,
        strVal: Helper.getArgsToString(args),
      });

      this.logList = this.cache.allLogs;
    };
  };

  export default {
    components: {
      RenderToolBar,
      RenderLogPanel
    },
    data() {
      return {
        filter: '',
        level: 'all',
        activeKey: 'log',
        logList: [],
        cache: {
          allLogs: []
        }
      }
    },
    computed: {
      listenFilterLevel() {
        const {
          filter,
          level
        } = this;

        return {
          filter,
          level
        };
      }
    },
  created() {
      this.hijackConsole();
    },
    beforeDestroy() {
      this.resetConsole();
    },
    methods: {
      resetConsole() {
        Object.keys(hijackMap).forEach((method) => {
          // @ts-ignore
          window.console[method] = hijackMap[method].originMethod;
        });
      },
      hijackConsole() {
        Object.keys(hijackMap).forEach(method => {
          // 放这里定义会堆栈溢出
          hijackConsole.call(this, method);
        });
      },
      onChangeFilter(filter) {
        this.filter = filter;
      },
      onChangeLevel(level) {
        this.level = level;
      },

      onClickClear() {
        this.logList = [];

        this.cache.allLogs = [];
      },
    },
    watch: {
      listenFilterLevel() {
        const filteredLogs = this.cache.allLogs
          .filter((log) => {
            if (this.level === 'all') {
              return true;
            } else {
              return log.type === this.level;
            }
          })
          .filter((log) => {
            return log.strVal.indexOf(this.filter) > -1;
          });
        this.logList = filteredLogs;
      }
    }
  }
</script>