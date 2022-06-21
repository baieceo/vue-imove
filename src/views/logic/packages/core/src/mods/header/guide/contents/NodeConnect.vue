<template>
    <div>
      <h2>节点间数据通信</h2>
      <p>
        在 iMove
        中，数据是以流（pipe）的形式从前往后进行流动的，也就是说前一个节点的返回值会是下一个节点的输入。不过也有一个例外，由于
        <b>分支节点</b>的返回值会是 boolean
        类型，因此它的下游节点拿到的输入必将是一个 boolean
        类型值，从而造成数据流的中断。为此，我们进行了一定的改造，分支节点的作用只负责数据流的转发，就像一个开关一样，只决定数据流的走向，但不改变流向下游的数据流值。
      </p>
      <p>
        因此，前文例子中的<b>请求profile接口</b>和<b>返回数据</b>
        两个节点会成为数据流的上下游关系。我们再来看下他们之间是如何进行数据通信的：
      </p>
      <pre v-pre>
// 节点: 请求profile接口
export default async function() {
  return fetch('/api/profile')
    .then(res => res.json())
    .then(res => {
      const {success, data} = res
      return {success, data}
    }).catch(err => {
      console.log('fetch /api/isLogin failed, the err is:', err)
      return {success: false}
    })
}
      </pre>
      <pre v-pre>
// 节点: 接口成功
export default async function(ctx) {
  // 获取上游数据
  const pipe = ctx.getPipe() || {}
  return pipe.success
}
      </pre>
      <pre v-pre>
// 节点: 返回数据
const doSomething = (data) => {
  // TODO: 数据加工处理
  return data
}
export default async function(ctx) {
  // 这里获取到的上游数据，不是"接口成功"这个分支节点的返回值，而是"请求profile接口"这个节点的返回值
  const pipe = ctx.getPipe() || {}
  ctx.emit('updateUI', {profileData: doSomething(pipe.data)})
}
      </pre>
      如上代码所述，每个下游节点可以调用 <b>ctx.getPipe</b>{' '}
      方法获取上游节点返回的数据流。另外，需要注意的是 <b>返回数据</b>{' '}
      节点的最后一行代码 <b>ctx.emit('eventName', data)</b>{' '}
      需要和你项目中的代码配合使用。
    </div>
</template>

<script>
export default {
    
}
</script>