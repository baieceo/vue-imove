<template>
  <div>
    <h2>节点代码规范</h2>
    <p>点击编辑按钮，可打开代码编辑器</p>
    <img width="100%" alt="节点代码规范"
      src="https://img.alicdn.com/imgextra/i4/O1CN01tJ0gmo1oxKF3eOLkH_!!6000000005291-2-tps-3268-1826.png" />
    <p>
      每个节点的代码等价于一个 js
      文件，因此你不用担心全局变量的命名污染问题，甚至可以 import 现有的 npm
      包，但最后必须 export 出一个函数。需要注意的是，由于 iMove
      天生支持节点代码的异步调用，因此 export 出的函数默认是一个 promise。
    </p>
    <p>
      就拿 <b>是否登录</b> 这个分支节点为例，我们来看下节点代码该如何编写：
    </p>
    <pre v-pre>
export default async function() {
  return fetch('/api/isLogin')
    .then(res => res.json())
    .then(res => {
      const {success, data: {isLogin} = {}} = res
      return success && isLogin
    }).catch(err => {
      console.log('fetch /api/isLogin failed, the err is:', err)
      return false
    })
  }
</pre>
    <p>
      注：由于该节点是<b>分支节点</b>，因此其 boolean
      返回值决定了整个流程的走向
    </p>
  </div>
</template>

<script>
  export default {
  }
</script>