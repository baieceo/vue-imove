<template>
  <div class="container">
    <SplitPane horizontal>
      <Pane size="54" min-size="6">
        <SplitPane>
          <Pane class="pane" size="50" min-size="50" max-size="94">
            <div class="runWrapper">
              <template v-if="isRunning">
                <el-button size="large" type="text" icon="icon-sam icon-sam-loading icon-sam__spin"> 运行中...</el-button>
              </template>
              <template v-else>
                <el-button size="large" type="text" @click="onClickRun" icon="icon-sam icon-sam-yunhang"> 运行代码
                </el-button>
              </template>
            </div>
            <Card title="输入" class="input">
              <InputPanel :data="input" @change="onChangeInput" />
            </Card>
          </Pane>

          <Pane class="pane" size="50" min-size="6">
            <Card title="输出" class="output">
              <JsonView :show-double-quotes="true" :expand-depth="10" :value="output" />
            </Card>
          </Pane>
        </SplitPane>
      </Pane>
      <Pane class="pane" size="46" min-size="6">
        <Console />
      </Pane>
    </SplitPane>
  </div>
</template>

<style lang="scss" scoped>
  @import './index.module.scss';
</style>

<script>
  import {
    Graph
  } from '@antv/x6';
  import Card from './Card.vue';
  import Console from '../console';
  import InputPanel from './inputPanel';
  import JsonView from 'vue-json-viewer';
  import {
    executeScript
  } from '../../utils';
  import {
    compileForOnline
  } from '../../../../compile-code/src/index';
  import {
    toSelectedCellsJSON
  } from '../../utils/flowChartUtils';

  import {
    Splitpanes as SplitPane,
    Pane
  } from 'splitpanes';

  function isJson(obj) {
    const t = typeof obj;
    return ['boolean', 'number', 'string', 'symbol', 'function'].indexOf(t) == -1;
  }

  const defaultInput = {
    pipe: {},
    context: {},
    payload: {},
    config: {},
  };

  export default {
    components: {
      Card,
      Console,
      InputPanel,
      JsonView,
      SplitPane,
      Pane
    },
    props: {
      flowChart: {
        type: Graph
      }
    },
    data() {
      return {
        isRunning: false,
        input: defaultInput,
        output: {}
      }
    },
    created() {
      window.addEventListener('iMoveOnlineExecEnds', this.handler);
    },
    beforeDestroy() {
      window.removeEventListener('iMoveOnlineExecEnds', this.handler);
    },
    methods: {
      handler(data) {
        this.isRunning = false;
        // console.dir(data)

        if (isJson(data.detail) == true) {
          this.output = data.detail || {};
          // console.dir( data.detail)
        }
      },
      async onClickRun() {
        this.isRunning = true;

        const selectedCelssJson = toSelectedCellsJSON(this.flowChart);
        const compiledCode = compileForOnline(selectedCelssJson, this.input);

        executeScript(compiledCode);
      },
      onChangeInput(val) {
        this.input = { ...val };
      }
    },
    watch: {
      flowChart: {
        handler() {
          this.onClickRun();
        }
      }
    },
    input: {
      handler() {
        this.onClickRun();
      },
      deep: true
    }
  }
</script>