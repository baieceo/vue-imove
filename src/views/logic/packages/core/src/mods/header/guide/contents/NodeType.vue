<template>
  <div>
    <h2>节点类型</h2>
    <p>在 iMove 中，我们将流程图的节点一共分为以下 3 种类型：</p>
    <ol>
      <li>
        开始节点：逻辑起始，是所有流程的开始，可以是一次生命周期初始化/一次点击
      </li>
      <li>行为节点：逻辑执行，可以是一次网络请求/一次改变状态/发送埋点等</li>
      <li>分支节点：逻辑路由，根据不同的逻辑执行结果跳转到不同的节点</li>
    </ol>
    <b>（注：一条逻辑流程必须以 开始节点 为起始）</b>
    <p>
      根据上述的规范描述，我们可以绘制出各种各样的逻辑流程图，例如
      <b>获取个人数据</b>的逻辑流程图如下所示：
    </p>
    <img width="100%" alt="节点类型"
      src="https://img.alicdn.com/imgextra/i3/O1CN01hPtj531F1bmJDXpfy_!!6000000000427-2-tps-3266-1820.png" />
  </div>
</template>

<script>
  export default {

  }
</script>