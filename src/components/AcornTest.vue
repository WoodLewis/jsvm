<template>
  <div>look at console</div>
</template>
<script>
import * as acorn from "acorn";

import jsvm from "../js/ByteCode";

const jsCode = `
console.log(window.document.body.innerHTML.toString())
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
    console.log(runtime.toString());
    console.log(runtime.run())
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>