<template>
  <div>look at console</div>
</template>
<script>
import * as acorn from "acorn";

import jsvm from "../js/ByteCode";



const jsCode = `
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
// !function(n){"use strict";function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((u=d(d(t,n),d(e,u)))<<o|u>>>32-o,r)}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function c(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=g(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=g(a,c,f,i,n[h+6],9,-1069501632),i=g(i,a,c,f,n[h+11],14,643717713),f=g(f,i,a,c,n[h],20,-373897302),c=g(c,f,i,a,n[h+5],5,-701558691),a=g(a,c,f,i,n[h+10],9,38016083),i=g(i,a,c,f,n[h+15],14,-660478335),f=g(f,i,a,c,n[h+4],20,-405537848),c=g(c,f,i,a,n[h+9],5,568446438),a=g(a,c,f,i,n[h+14],9,-1019803690),i=g(i,a,c,f,n[h+3],14,-187363961),f=g(f,i,a,c,n[h+8],20,1163531501),c=g(c,f,i,a,n[h+13],5,-1444681467),a=g(a,c,f,i,n[h+2],9,-51403784),i=g(i,a,c,f,n[h+7],14,1735328473),c=v(c,f=g(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=v(a,c,f,i,n[h+8],11,-2022574463),i=v(i,a,c,f,n[h+11],16,1839030562),f=v(f,i,a,c,n[h+14],23,-35309556),c=v(c,f,i,a,n[h+1],4,-1530992060),a=v(a,c,f,i,n[h+4],11,1272893353),i=v(i,a,c,f,n[h+7],16,-155497632),f=v(f,i,a,c,n[h+10],23,-1094730640),c=v(c,f,i,a,n[h+13],4,681279174),a=v(a,c,f,i,n[h],11,-358537222),i=v(i,a,c,f,n[h+3],16,-722521979),f=v(f,i,a,c,n[h+6],23,76029189),c=v(c,f,i,a,n[h+9],4,-640364487),a=v(a,c,f,i,n[h+12],11,-421815835),i=v(i,a,c,f,n[h+15],16,530742520),c=m(c,f=v(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function i(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function a(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return i(c(a(n=r(n)),8*n.length))}function u(n,t){return function(n,t){var r,e=a(n),o=[],u=[];for(o[15]=u[15]=void 0,16<e.length&&(e=c(e,8*n.length)),r=0;r<16;r+=1)o[r]=909522486^e[r],u[r]=1549556828^e[r];return t=c(o.concat(a(t)),512+8*t.length),i(c(u.concat(t),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.md5=t}(window);

;(function ($) {
  'use strict'


  function safeAdd(x, y) {
    var lsw = (x & 0xffff) + (y & 0xffff)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xffff)
  }

  function bitRotateLeft(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt))
  }

 
  function md5cmn(q, a, b, x, s, t) {
    var aq=safeAdd(a, q)
    var xt=safeAdd(x, t)
    return safeAdd(bitRotateLeft(safeAdd(aq, xt), s), b)
  }

  function md5ff(a, b, c, d, x, s, t) {
    var p1=(b & c) | (~b & d)
    console.log("in md5ff p1 is "+p1)
    return md5cmn(p1, a, b, x, s, t)
  }

  function md5gg(a, b, c, d, x, s, t) {
    return md5cmn((b & d) | (c & ~d), a, b, x, s, t)
  }
 
  function md5hh(a, b, c, d, x, s, t) {
    return md5cmn(b ^ c ^ d, a, b, x, s, t)
  }
  
  function md5ii(a, b, c, d, x, s, t) {
    return md5cmn(c ^ (b | ~d), a, b, x, s, t)
  }

  
  function binlMD5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << len % 32
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

console.log("before loop x is "+x)

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      console.log("before loop "+i+" a is "+a+" b is "+b+" c is "+c+" i is "+i+ " x[i] is "+x[i])

      a = md5ff(a, b, c, d, x[i], 7, -680876936)
      d = md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

    console.log("after loop "+i+" md5ff a is "+a+" b is "+b+" c is "+c)

      a = md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = md5gg(b, c, d, a, x[i], 20, -373897302)
      a = md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      console.log("after loop "+i+" md5gg a is "+a+" b is "+b+" c is "+c)

      a = md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = md5hh(d, a, b, c, x[i], 11, -358537222)
      c = md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      console.log("after loop "+i+" md5hh a is "+a+" b is "+b+" c is "+c)

      a = md5ii(a, b, c, d, x[i], 6, -198630844)
      d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      console.log("after loop "+i+" md5hh a is "+a+" b is "+b+" c is "+c)

      a = safeAdd(a, olda)
      b = safeAdd(b, oldb)
      c = safeAdd(c, oldc)
      d = safeAdd(d, oldd)
      console.log("after loop "+i+" x is "+x)
    }
    return [a, b, c, d]
  }

  
  function binl2rstr(input) {
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> i % 32) & 0xff)
    }
    return output
  }

 
  function rstr2binl(input) {
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xff) << i % 32
    }
    return output
  }


  function rstrMD5(s) {
    var rstr=rstr2binl(s)
    console.log("after rstr2binl input is "+rstr)
    var bin=binlMD5(rstr, s.length * 8)
    console.log("after binlMD5 input is "+bin)
    return binl2rstr(bin)
  }


  function rstrHMACMD5(key, data) {
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5c5c5c5c
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  }


  function rstr2hex(input) {
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0f) + hexTab.charAt(x & 0x0f)
    }
    return output
  }


  function str2rstrUTF8(input) {
    var ec=encodeURIComponent(input)
    var uu=unescape(ec)
    return uu
  }


  function rawMD5(s) {
    var str=str2rstrUTF8(s)
    console.log("after str2rstrUTF8 input is "+str)
    var r=rstrMD5(str)
    console.log("after rstrMD5 input is "+r)
    return r
  }

  function hexMD5(s) {
    return rstr2hex(rawMD5(s))
  }

  function rawHMACMD5(k, d) {
    return rstrHMACMD5(str2rstrUTF8(k), str2rstrUTF8(d))
  }

  function hexHMACMD5(k, d) {
    return rstr2hex(rawHMACMD5(k, d))
  }


  function md5(string, key, raw) {
    if (!key) {
      if (!raw) {
        console.log("raw is false,hexMD5 input")
        return hexMD5(string)
      }
      console.log("key is null,rawMD5 input")
      return rawMD5(string)
    }
    if (!raw) {
      console.log("raw is false,hexHMACMD5 input")
      return hexHMACMD5(key, string)
    }
    console.log("raw is false,rawHMACMD5 input")
    return rawHMACMD5(key, string)
  }

  if (typeof define === 'function' && define.amd) {
    define(function () {
      return md5
    })
    console.log("current define is "+define)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = md5
    console.log("module is"+module)
  } else {
    $.md5 = md5
    console.log("current $ is "+$)
  }

})(window)

md5("abcdefghijklmn")

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