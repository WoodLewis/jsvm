<template>
<div>
    look at console
</div>
</template>
<script>
import * as acorn from 'acorn'

import accept from '../js/ByteCode'

const jsCode=`
// const c={
//   a:1,
//   c:"cdf",
//   d:new Date()
// }
const b=1+2
// const arr=[1,2,3,4,5,new Date(1222),func(123,'abc')]
// const str='abcdsff',nstr=arr
// const date=new Date(1234567788)
// console.log(arr[1][0])
// arr.split(2)
// logStr('abc',123)
for(let i=0;b++,i<6;++i){
  // if(i<3) continue;
  // if(i>9){
  //   break;
  // }
  // if(i===3){
  //   continue;
  // }
  // if(b=4){
  //   continue;
  // }
  console.log(i)
}
while(b-->0){
  console.log(b)
}

while(b-->0) console.log(b);

log(b)
`


export default {
  name: 'AcornTest',
  props: {
    msg: String
  },
  mounted(){

    const node=acorn.parse(jsCode,{sourceType:'script',ecmaVersion:2015})

    console.log(node)
    console.log(accept.accept(node))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>