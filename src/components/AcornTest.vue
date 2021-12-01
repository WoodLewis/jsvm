<template>
  <div>look at console</div>
</template>
<script>
import * as acorn from "acorn";

import jsvm from "../js/Translator";



const jsCode = `

// const bef=123

// function abcd(){
//   console.log("value bef="+bef)
//   console.log("value after="+after)
//   if(tt){
//     console.log("t.a="+tt.a)
//     console.log("t.b="+tt.b())
//     console.log("t.c="+tt.c)
//     console.log("t.c.d="+tt.c.d())
//   }

// }
// abcd()
// const after=3456
// abcd()
// const tt={
//   a:'t.a',
//   b:function(){
//     return 't.b'
//   },
//   c:{
//     d:function(){
//       console.log("t.c.d called")
//       return 't.c.d'
//     }
//   }
// }
// abcd()

// const aaa=1;
// console.log("aaa="+aaa)
// if(aaa>=1&&aaa<3){
//   console.log("aaa>=1 and aaa<3")
// }else if(aaa<5&&a>=3){
//   console.log("aaa<5 and a>=3")
// }else{
//   console.log("else statement")
// }

// aaa=3
// console.log("aaa="+aaa)
// if(aaa>=1&&aaa<3){
//   console.log("aaa>=1 and aaa<3")
// }else if(aaa<5&&aaa>=3){
//   console.log("aaa<5 and a>=3")
// }else{
//   console.log("else statement")
// }

// aaa=4
// console.log("aaa="+aaa)
// if(aaa>=1&&aaa<3){
//   console.log("aaa>=1 and aaa<3")
// }else if(aaa<5&&a>=3){
//   console.log("aaa<5 and a>=3")
// }else{
//   console.log("else statement")
// }
// console.log()
!function(n){
   console.log(n)
    "use strict";
    function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}
    function f(n,t,r,e,o,u){return d((u=d(d(t,n),d(e,u)))<<o|u>>>32-o,r)}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}
    function g(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}
    function v(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}
    function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}
    function c(n,t){
      var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;
        console.log("c-n"+n)
      for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)
        c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),
        f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),
        i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),
        a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),
        c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),
        c=g(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=g(a,c,f,i,n[h+6],9,-1069501632),
        i=g(i,a,c,f,n[h+11],14,643717713),f=g(f,i,a,c,n[h],20,-373897302),c=g(c,f,i,a,n[h+5],5,-701558691),
        a=g(a,c,f,i,n[h+10],9,38016083),i=g(i,a,c,f,n[h+15],14,-660478335),f=g(f,i,a,c,n[h+4],20,-405537848),
        c=g(c,f,i,a,n[h+9],5,568446438),a=g(a,c,f,i,n[h+14],9,-1019803690),i=g(i,a,c,f,n[h+3],14,-187363961),
        f=g(f,i,a,c,n[h+8],20,1163531501),c=g(c,f,i,a,n[h+13],5,-1444681467),a=g(a,c,f,i,n[h+2],9,-51403784),i=g(i,a,c,f,n[h+7],14,1735328473),
        c=v(c,f=g(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=v(a,c,f,i,n[h+8],11,-2022574463),i=v(i,a,c,f,n[h+11],16,1839030562),
        f=v(f,i,a,c,n[h+14],23,-35309556),c=v(c,f,i,a,n[h+1],4,-1530992060),a=v(a,c,f,i,n[h+4],11,1272893353),i=v(i,a,c,f,n[h+7],16,-155497632),
        f=v(f,i,a,c,n[h+10],23,-1094730640),c=v(c,f,i,a,n[h+13],4,681279174),a=v(a,c,f,i,n[h],11,-358537222),i=v(i,a,c,f,n[h+3],16,-722521979),
        f=v(f,i,a,c,n[h+6],23,76029189),c=v(c,f,i,a,n[h+9],4,-640364487),a=v(a,c,f,i,n[h+12],11,-421815835),i=v(i,a,c,f,n[h+15],16,530742520),
        c=m(c,f=v(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),
        f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),
        f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),
        f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),
        f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);
        console.log("c-ret-"+[c,f,i,a])
        return[c,f,i,a]
        
        }
    function i(n){
      console.log("i-n"+n)
      for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);
      console.log("i-t-"+t)
      return t}
    function a(n){var t=[];
      console.log("a-n"+n)
      for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;
      for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}
    function e(n){
      console.log("e-n"+n)
      for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}
    function r(n){ console.log("r-n"+n);return unescape(encodeURIComponent(n))}
    function o(n){console.log("o-n"+n);return i(c(a(n=r(n)),8*n.length))}
    function u(n,t){
      return function(n,t){
         
        var r,e=a(n),o=[],u=[];
         console.log("u-n-e"+e)
        for(o[15]=u[15]=void 0,16<e.length&&(e=c(e,8*n.length)),r=0;r<16;r+=1)
          o[r]=909522486^e[r],u[r]=1549556828^e[r];
        return t=c(o.concat(a(t)),512+8*t.length),i(c(u.concat(t),640))}(r(n),r(t))}
    function t(n,t,r){
      console.log("t-t-"+t)
      console.log("t-n-"+n)
      return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}
    console.log(n)
    "function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.md5=t
    }(window);

// function sign(url){
//   if(!wx){  return "" }
//   const globalData=app.globalData
//   if((!globalData.url)||(!globalData.apiVer)){ return "" }
//   const apiVer=Number.parseFloat(globalData.apiVer)
//   if(apiVer<2){ return "" }

//   const salt=(Math.random()+"1234567890").substring(2,10)
//   const token=wx.getStorageSync("user-session")
//   const md5=CryptoJS.MD5(salt+"-"+token+"-"+url).toString()
//   if((globalData.url.indexOf("localhost:8097")<0)
//         &&(globalData.url.indexOf("wxappvideo.com")<0)){
//     return ""
//   }

//   return md5.substr(0,8)+salt+md5.substr(8)
// }
// sign(url)

// function decodeData(data){
//   if(!wx){  return {} }
//   const globalData=app.globalData
//   if((!globalData.url)||(!globalData.apiVer)){ return {} }
//   const apiVer=Number.parseFloat(globalData.apiVer)
//   if(apiVer<2){ return {} }

//   const account=wx.getAccountInfoSync();
//   if(!account){
//     return {}
//   }
//   const token=wx.getStorageSync("user-session")
//   const appId=account.miniProgram.appId

//   const keystr=CryptoJS.MD5(appId+"###"+token+"-locked").toString()
//   const key = CryptoJS.enc.Utf8.parse(keystr);
//   const encryptedBase64Str = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(data));

//   if((globalData.url.indexOf("localhost:8097")<0)
//         &&(globalData.url.indexOf("wxappvideo.com")<0)){
//     return {}
//   }
//   const decryptedData = CryptoJS.AES.decrypt(encryptedBase64Str, key, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7
//   });

//   const decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
//   const retData=JSON.parse(decryptedStr)
//   const url=globalData.url
//   if((url.indexOf("localhost:8097")<0)
//       &&(url.indexOf("wxappvideo.com")<0)){
//       return {}
//   }
//   return retData
// }

// decodeData(data)

// console.log(window.document.body.innerHTML.toString())
// console.log(123 instanceof Number)

// let yu=null,xu=undefined

// let x=3
// x+=2
// function abc(a1){
 
//   console.log("outter x is "+(x++))
//   console.log("argument0 is "+a1)
  
//   return 22;
// }


// console.log(typeof new Date() === 'object')
// console.log(typeof new Date())

// console.log(typeof "123")
// console.log(typeof Symbol() === 'symbol');
// console.log(typeof undefined === 'undefined')
// console.log(typeof abc === 'function')

// const varFunc=function(a,b,c){
//   console.log(999)
// }
// varFunc()

// console.log("nest function returns "+abc(33))
// console.log("after clouser x is "+x)
// let k=9;
// for(var i=3;i>=0;i--){
//   k=k/i;
//   console.log(k/i)
// }
// console.log("last k="+k)
// if(k=9){
//   console.log("current k="+k)
// }
// if(k=0){
//   console.error("this should not be seen ")
// }
//  console.log("current ~k="+~k)
// try{
//   console.log("try block")
//   throw new Error("msg")
// }catch(e){
//    console.log("catch block")
//   console.log(e)
// }finally{
//   console.log("finally block")
// }

// try{
//   console.log("try block2")
// }catch(e){
//    console.log("catch block2")
//   console.log(e)
// }finally{
//   console.log("finally block2")
// }

// try{
//   console.log("try block3")
// }finally{
//   console.log("finally block3")
// }

// const c={
//   a:4,
//   c:"cdf",
//   d:new Date()
// }
// const b=1+!2
// const arr=[1,2,3,4,5,new Date(1222),-3]
// const str='abcdsff',nstr=arr
// const date=new Date(1234567788)
// console.log(arr[1])
// arr.slice(2)

// while(b-->0){
//   console.log(b)
// }
// console.log(c.d.getTime())
// while(b-->0) console.log(b);

// console.log("testFunc result is "+testFunc().toString().split("5"))

//  const ca=5;
// switch(ca){
//   case 1:
//   case 2:
//     {
//       console.log("this is 1 or 2")
//     } break; 
//   case 3:{
//     console.log("this is 3")
//   }break;
//   case 4: console.log("this is 4");break;
//   case 5:
//     case 6:
//       case 7:{
//         console.log("this is 5 or 6 or 7");
//         console.log("now is "+new Date().getTime())
//       }
//        break;  
//   default:console.log("this is default");
// }

// do{
//   c.a=c.a-1
//   console.log(c)
// }while(c.a)

// for(let k=0;k<5;++k){
//   console.log("5 times for "+(k+1))
// }

// b+1
// arr

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
    const vm=jsvm.accept(jsCode,node)
    console.log(vm);
    vm.localMethods.forEach(v=>console.log(v))
    const runtime=vm.translate()
    console.log(runtime)
    const strRuntime=runtime.toString()
    // console.log(strRuntime);
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