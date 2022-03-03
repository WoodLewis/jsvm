<template>
  <div id="app">
    <button @click="compileMd5">编译md5</button>
    <button @click="compileSha512">编译sha512</button>
    <div style="display:flex">
        <code-viewer :key="1" style="width:600px;" :sourceCode="sourceCode" @code-change="changeSource"/>
        <code-viewer :key="2" style="width:600px;" :sourceCode="compiledCode" @code-change="changeCode"/>
    </div>
    <button @click="compileCode">转换</button>
    <button @click="runCode">运行</button>
  </div>
</template>

<script>
import shiye from "./js/Translator";
import * as MrHuang from "acorn";
import CodeViewer from './components/CodeViewer.vue'

import md5Js from './js/FileRaw!./assets/md5.min.txt'
import sha512Js from './js/FileRaw!./assets/sha512.js.txt'
//功能测试代码
const testJs=`
console.log("也不对【-_.'~!*()】及【@#$&+=:;/?,】编码")
const obj={
  a:1,b:2,
  c:{
    d:1,f:2
  }
}
delete obj.a
delete obj["b"]
delete obj.c.d
console.log(obj)

let kk=0;
kk++,console.log(kk),++kk,console.log(kk),kk
console.log(kk)

let k=0,m=0;
m=k+k++
console.log(m)
console.log(k)

m=k+(++k)
console.log(m)
console.log(k)

function switchTest(t){
  console.log("test case "+t)
  switch(t){
    case 1:console.log("1");break;
    case 2:console.log("2");
    default:console.log("default");
    case 3:console.log("3");break;
    case 4:{console.log("4");}break;
    case 5:{console.log("5");}
    case 6:{console.log("6");}
  }
}

switchTest(1)
switchTest(2)
switchTest(3)
switchTest(4)
switchTest(5)
switchTest(6)
switchTest(7)


function NewObject(obj){
  console.log("call NewObject constructor")
  this.$1=0
  this.$c="abcdefg"
  this.arg=obj
  console.log("now this is "+this)
}
NewObject.prototype.getFirst=function(){
  return this.$1
}

NewObject.prototype.getTest=function(){
  return this.$c
}
NewObject.prototype.getThis=function(){
  return this
}

console.log("test create new NewObject")
const testObj=new NewObject({param:123})

console.log("testObj is "+testObj)
console.log("test call method getFirst ,return is  "+testObj.getFirst())
console.log("test call method getTest ,return is  "+testObj.getTest())

console.log("test call method getThis ,return is  "+testObj.getThis())

console.log("test visit member ,testObj.args=  "+testObj.arg)
`

export default {
  name: 'App',
  components: {
    CodeViewer
  },
  data(){
    return {
      sourceCode:testJs,
      compiledCode:""
    }
  },
  mounted(){
    this.compileCode()
  },
  methods:{
    compileMd5(){
      this.sourceCode=md5Js
      this.compileCode()
    },
     compileSha512(){
      this.sourceCode=sha512Js
      this.compileCode()
    },
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
