<template>
  <div id="app">
    <div style="display:flex">
        <code-viewer :key="1" style="width:600px;" :sourceCode="sourceCode" @code-change="changeSource"/>
        <code-viewer :key="2" style="width:600px;" :sourceCode="compiledCode" @code-change="changeCode"/>
    </div>
    <button @click="compileCode">转换</button>
    <button @click="runCode">运行</button>
  </div>
</template>

<script>
import shiye from "./js/Shiye";
import * as MrHuang from "acorn";
import CodeViewer from './components/CodeViewer.vue'

// import md5js from './js/FileRaw!./assets/md5.min.txt'
import sha512js from './js/FileRaw!./assets/sha512.js.txt'

export default {
  name: 'App',
  components: {
    CodeViewer
  },
  data(){
    return {
      sourceCode:sha512js,
      compiledCode:""
    }
  },
  mounted(){
    this.compileCode()
  },
  methods:{
    changeSource(code){
      this.sourceCode=code
    },
    changeCode(code){
      this.compiledCode=code
    },
    compileCode(){
      const supperise=MrHuang.parse(this.sourceCode, {
        sourceType: "script",
        ecmaVersion: 2015,
      });
      console.log(supperise)
      const promise=shiye.accept(this.sourceCode,supperise)
      console.log(promise)
      const real=promise.translate()
      console.log(real)
      this.compiledCode=real.toString()
      // real.run()
      // console.log(real.md5)
      // console.log(real.md5("12345656789"))
    },
    runCode(){
      eval(this.compiledCode)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
