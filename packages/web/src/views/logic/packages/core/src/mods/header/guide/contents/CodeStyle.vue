<template>
    <div>
      <h2>启动项目</h2>
      <pre v-pre>
$ git clone git@github.com:imgcook/imove.git
$ cd imove
$ npm install
$ npm run example
      </pre>
      打开 <a href="http://localhost:8000/">http://localhost:8000/</a>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i2/O1CN01h8YOPl2AAhk6yQz6P_!!6000000008163-2-tps-3570-1986.png"
      />
      <h2>绘制流程图、编写代码</h2>
      <p>根据你的业务逻辑绘制流程图。双击各节点，完成每个节点的函数编写。</p>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i3/O1CN01HxT0mY1MMP4TlvwMp_!!6000000001420-2-tps-2250-598.png"
      />
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i3/O1CN01e2bC7824KsqtVLLJe_!!6000000007373-2-tps-3550-1750.png"
      />
      <h2>在项目中使用</h2>
      <p>这时有两种方式：</p>
      <ol>
        <li>在线打包出码</li>
        <li>本地启动开发模式</li>
      </ol>
      <h3>1. 在线打包出码</h3>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i4/O1CN01ysTe3s1UjJoSBs6PE_!!6000000002553-2-tps-3260-1800.png"
      />
      <p>
        点击页面右上方的导出按钮后，可以在弹窗内选择导出
        代码，此时流程图编译后的代码将以 zip
        包的形式下载到本地，你可以解压后再引入项目中使用。
      </p>
      <h3>2. 本地命令行出码</h3>
      <p>安装 CLI</p>
      <pre v-pre>$ npm install -g @imove/cli</pre>
      <p>进入项目根目录，imove 初始化</p>
      <pre v-pre>$ cd yourProject $ imove --init # 或 imove -i</pre>
      <p>本地启动开发模式</p>
      <pre v-pre>$ imove --dev # 或 imove -d</pre>
      <p>本地启动成功之后，可以看到原来的页面右上角会显示连接成功。</p>
      <img
        width="100%"
        src="https://img.alicdn.com/imgextra/i4/O1CN01lKVzHY1J7LCMgTrwC_!!6000000000981-2-tps-3148-1750.png"
      />
      <p>
        此时页面上触发 <b>保存快捷键 Ctrl + S</b> 时，可以看到当前项目的 src
        目录下会多出一个 <strong>logic</strong> 目录，这就是 imove
        编译生成的代码，此时你只要在你的组件中调用它即可。
      </p>
      <b>如上代码所示，需要注意两点：</b>
      <ol>
        <li>
          通过 logic.on 方法监听事件，事件名和参数与流程图中节点代码的 ctx.emit
          相对应
        </li>
        <li>
          通过 logic.invoke 方法调用逻辑，事件名与流程图中的开始节点的
          逻辑触发名称 相对应，不然会调用失败
        </li>
      </ol>
    </div>
</template>

<script>
export default {
    
}
</script>