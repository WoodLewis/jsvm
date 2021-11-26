<template>
  <div>look at console</div>
</template>
<script>
import * as acorn from "acorn";

import jsvm from "../js/ByteCode";



const jsCode = `
"use strict";
// console.log(window.document.body.innerHTML.toString())
console.log(123 instanceof Number)

let yu=null,xu=undefined

let x=3
x+=2
function abc(a1){
 
  console.log("outter x is "+(x++))
  console.log("argument0 is "+a1)
  
  return 22;
}


console.log(typeof new Date() === 'object')
console.log(typeof new Date())

console.log(typeof "123")
console.log(typeof Symbol() === 'symbol');
console.log(typeof undefined === 'undefined')
console.log(typeof abc === 'function')

const varFunc=function(a,b,c){
  console.log(999)
}
varFunc()

console.log("nest function returns "+abc(33))
console.log("after clouser x is "+x)
let k=9;
for(var i=3;i>=0;i--){
  k=k/i;
  console.log(k/i)
}
console.log("last k="+k)
if(k=9){
  console.log("current k="+k)
}
if(k=0){
  console.error("this should not be seen ")
}
 console.log("current ~k="+~k)
try{
  console.log("try block")
  throw new Error("msg")
}catch(e){
   console.log("catch block")
  console.log(e)
}finally{
  console.log("finally block")
}

try{
  console.log("try block2")
}catch(e){
   console.log("catch block2")
  console.log(e)
}finally{
  console.log("finally block2")
}

try{
  console.log("try block3")
}finally{
  console.log("finally block3")
}

const c={
  a:4,
  c:"cdf",
  d:new Date()
}
const b=1+!2
const arr=[1,2,3,4,5,new Date(1222),-3]
const str='abcdsff',nstr=arr
const date=new Date(1234567788)
console.log(arr[1])
arr.slice(2)

while(b-->0){
  console.log(b)
}
console.log(c.d.getTime())
while(b-->0) console.log(b);

console.log("testFunc result is "+testFunc().toString().split("5"))

 const ca=5;
switch(ca){
  case 1:
  case 2:
    {
      console.log("this is 1 or 2")
    } break; 
  case 3:{
    console.log("this is 3")
  }break;
  case 4: console.log("this is 4");break;
  case 5:
    case 6:
      case 7:{
        console.log("this is 5 or 6 or 7");
        console.log("now is "+new Date().getTime())
      }
       break;  
  default:console.log("this is default");
}

do{
  c.a=c.a-1
  console.log(c)
}while(c.a)

for(let k=0;k<5;++k){
  console.log("5 times for "+(k+1))
}

b+1
arr
`;

export default {
  name: "AcornTest",
  props: {
    msg: String,
  },
  mounted() {
    const node = acorn.parse(jsCode, {
      sourceType: "script",
      ecmaVersion: 2015,
    });

    console.log(node);
    const vm=jsvm.accept(node)
    console.log(vm);
    vm.localMethods.forEach(v=>console.log(v))
    const runtime=vm.compile()
    console.log(runtime)
    const strRuntime=runtime.toString()
    console.log(strRuntime);
    console.log("code length is "+strRuntime.length)
    

    window["testFunc"]=function(){
      return 1234567890
    }
    console.log(runtime.run());

    // console.log(eval(strRuntime))

    // const pt=new Proxy({},{
    //   get(target,p){
    //     if(p==="num"){
    //       return 1;
    //     }
    //     return target[p]
    //   },
    //   set(target,p,value){
    //     if(p==="num"){
    //       window["num"]=value;
    //     }else{
    //       target[p]=value
    //     }
    //     return true;
     
    //   }
    // })

    // console.log(pt.num)
    // pt.num=999
    // console.log(window.num)
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>