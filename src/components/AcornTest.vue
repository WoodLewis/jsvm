<template>
  <div>look at console</div>
</template>
<script>
import * as acorn from "acorn";

import jsvm from "../js/ByteCode";

window["testFunc"]=function(){
  return 1234567890
}

const jsCode = `
// console.log(window.document.body.innerHTML.toString())
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
    const runtime=vm.compile()
    const strRuntime=runtime.toString()
    console.log(strRuntime);
    //  console.log(runtime.run());
    console.log(eval(strRuntime))
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>