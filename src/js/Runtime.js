function Runtime(bytecodes,codeoffset,env){
    this.extenals=[]
    this.errorMap=[]
    this.stack=[]
    this.stackArray=[]
    this.pointer=0
    this.codeOffset=codeoffset||0
    this.constants=[]
    this.code=bytecodes||[]
    this.env=env||{}
    this.retVal=null
    this.codeMap=[]
    this.error=null
    this.accesstors=[]
    this.contextMap=[]
}

Runtime.prototype.run=function(){
    this.pointer=this.codeOffset
    while(this.pointer<this.code.length){
        try{
            this.codeMap[this.code[this.pointer]](this)
        }catch(e){
            this.error=e,this.throwError()
        }
    }
    if(this.error){
        throw new Error(this.error.name+":"+this.error.message)
    }
    return this.retVal
}

Runtime.prototype.retValue=function(retVal){
    return this.retVal=retVal
}

Runtime.prototype.gotoEnd=function(){
    return this.pointer=this.code.length
}


Runtime.prototype.envObject=function(name){
    return Object.prototype.hasOwnProperty.call(this.env,name)?this.env[name]:window[name]
}

Runtime.prototype.pushBackEnv=function(name,val){
    Object.prototype.hasOwnProperty.call(this.env,name)?(this.env[name]=val):(window[name]=val)
}

Runtime.prototype.newStack=function(){
    this.stack[this.stack.length]=[]
    this.stackArray[this.stackArray.length]=[]
}

Runtime.prototype.delStack=function(){
    this.stack.pop(),this.stackArray.pop()
}

Runtime.prototype.nextCodeNVal=function(n){
    return this.code[this.pointer+n]
}
Runtime.prototype.nextCodeVal=function(){
    return this.code[this.pointer+1]
}

Runtime.prototype.storeStackValue=function(stack,index,val){
    this.stackArray[stack][index]=val
}

Runtime.prototype.visitStackVal=function(stack,index){
    return this.stackArray[stack][index]
}

Runtime.prototype.visitContextVal=function(stack,index){
    return this.contextMap[stack][index]
}

Runtime.prototype.storeContextVal=function(stack,index,val){
    this.contextMap[stack][index]=val
}


Runtime.prototype.pushStack=function(obj){
    this.stack[this.stack.length-1].push(obj)
}

Runtime.prototype.popStackTop=function(){
    return this.stack[this.stack.length-1].pop()
}

Runtime.prototype.dupStackTop=function(){
    const st=this.stack[this.stack.length-1]
    st.push(st[st.length-1])
}

Runtime.prototype.popStackTopN=function(n){
    const st=this.stack[this.stack.length-1]
    const arr=[]
    for(let i=n;i>0;--i){
        arr[i-1]= st.pop()
    }
    return arr
}
Runtime.prototype.popStackCodeTopN=function(){
    return this.popStackTopN(this.code[this.pointer+1])
}

Runtime.prototype.loadConstant=function(index){
    return this.loadCodeArray(index,this.code[index-1])
        .map((v,i)=>String.fromCharCode(v^i))
        .join('')
}

Runtime.prototype.loadCodeArrayN=function(index){
    const _=index+this.codeOffset+1
    return this.code.slice(_,_+this.code[index+this.codeOffset])
}

Runtime.prototype.loadCodeArray=function(start,end){
    return this.code.slice(this.codeOffset+start,this.codeOffset+end)
}

Runtime.prototype.next=function(len){
    this.pointer+=len
}

Runtime.prototype.goto=function(index){
    this.pointer=index+this.codeOffset
}

Runtime.prototype.jmp=function(){
    this.goto(this.code[this.pointer+1])
}

Runtime.prototype.exit=function(){
    this.goto(this.code.length)
    this.accesstors&&this.accesstors.length&&this.accesstors.forEach(v=>v.exit())
}

Runtime.prototype.loadError=function(){
    this.pushStack(this.error)
    this.error=null
}

Runtime.prototype.loadErrorMap=function(_a){
    this.errorMap=_a
}


Runtime.prototype.setError=function(){
    this.error=this.popStackTop()
}

Runtime.prototype.throwError=function(){
    const val=this.pointer-this.codeOffset
    for(let i=0;this.errorMap[i];i+=3){
        if(this.errorMap[i]<=val&&val<this.errorMap[i+1]){
            return this.goto(this.errorMap[i+2])
        }
    }
    this.exit()
}

Runtime.prototype.newFunc=function(_l,_b,_m){
    const that=this;
    return function(){
        const nr= new Runtime(_b,0,that.env)
        nr.accesstors=[that].concat(that.accesstors)
        nr.contextMap=_m
        nr.newStack()
        nr.codeMap=that.codeMap
        for(let i=0;i<_l;++i){
            nr.storeStackValue(0,i,arguments[i])
        }
        return nr.run()
    }
}

Runtime.prototype.childContext=function(_p,_i){
    return (_p?this.accesstors[_p-1]:this).stackArray[_i]
}

Runtime.prototype.loadContext=function(_p,_i){
    this.contextMap.push(this.accesstors[_p].stackArray[_i])
}



function replaceBlank(str){
    return  str
    .replace(/\/\/[^\n]*\n/g,"")//去掉注释
    .replace(/[\n\r\t\s]*([{}[\]}();]+)[\n\r\t\s]*/g,"$1")//去除[]{}();的前后空白
    .replace(/[\n\r\t\s]*([+\-*/%=><&|!><?.,]+)[\n\r\t\s]*/g,"$1")//去除常见操作符的前后空白
    .replace(/;}/g,"}")
}

function reloaceLocalVar(func){
    return func.replaceAll("this.stackArray","this._a")
    .replaceAll("that.stackArray","that._a")
    .replaceAll("].stackArray","]._a")
    .replaceAll("this.env","this._e")
    .replaceAll("that.env","that._e")
    .replaceAll("this.stack","this._s")
    .replaceAll("this.pointer","this._p")
    .replaceAll("this.codeMap","this._c")
    .replaceAll("that.codeMap","that._c")
    .replaceAll("nr.codeMap","nr._c")
    .replaceAll("this.codeOffset","this._o")
    .replaceAll("this.errorMap","this._em")
    .replaceAll("this.error","this.$e")
    .replaceAll("this.code","this._$")
    .replaceAll("this.retVal","this.$")
    .replaceAll("this.accesstors","this.$a")
    .replaceAll("that.accesstors","that.$a")
    .replaceAll("nr.accesstors","nr.$a")
    .replaceAll("this.contextMap","this.$c")
    .replaceAll("that.contextMap","that.$c")
    .replaceAll("stack","$0")
    .replaceAll("index","$1")
    .replaceAll("name","$2")
    .replaceAll("retVal","$$")
    .replaceAll("val","$_")
    .replaceAll("that","$t")
}

Runtime.prototype.toString=function(){
    const prototypes=Object.getOwnPropertyNames(Runtime.prototype)
    const arr=[]
    for(let i=0;prototypes[i];++i){
        switch(prototypes[i]){
            case "constructor":
            case "toString":
            case "run":    
                break;
            default: arr.push(prototypes[i]);break;   
        }
    }
    const replaceMethods=function(str){
        for(let i=0;arr[i];++i){
            str=str
                .replaceAll("this."+arr[i]+"(","this.__"+i+"(")
                .replaceAll("runtime."+arr[i]+"(","runtime.__"+i+"(")
                .replaceAll("nr."+arr[i]+"(","nr.__"+i+"(")
                .replaceAll("v."+arr[i]+"(","v.__"+i+"(")
        }
        return str
    }
    let code=this.code
    let codeMap=this.codeMap.toString()
        .replace(/function\s+_apply\(runtime\)/g,"r=>")
    //替换一些常用的变量值   
    codeMap=replaceMethods(replaceBlank(codeMap)).replaceAll("runtime.__","r.__")
        .replaceAll("index","_i")
        .replaceAll("target","_t")
        .replaceAll("property","_p")
        .replaceAll("left","_")
        .replaceAll("right","__")
        .replaceAll("className","_n")
        .replaceAll("objName","_0")
        .replaceAll("methodName","_1")
        .replaceAll("args","___")
        .replaceAll("array","_2")
        .replaceAll("val","_3")
        .replace(/var\s+([_\w]+)=([^;]+);var\s+([_\w]+)=/g,"var $1=$2,$3=")
        .replace(/if\(([^()]+)\)\{([^}]+)\}else\{([^}]+)\}/g,"($1)?($2):($3);")
    let runtimeMethods="([";
    for(let i=0;arr[i];++i){
        runtimeMethods+="{__"+i+":"+
            reloaceLocalVar(replaceMethods(replaceBlank(Runtime.prototype[arr[i]].toString())))
            +"},"
    }
    runtimeMethods+="{run:"+reloaceLocalVar(replaceBlank(replaceMethods(Runtime.prototype.run.toString())))+"}]).forEach(v=>{for(var i in v){Runtime.prototype[i]=v[i]}})"

   
    const declearation= `function Runtime(_,__,___){this.$a=[],this.$c=[],this._s=[],this._a=[],this._em=[],this._p=0,this.$=this.$e=null,this._e=___||{},this._o=__||0,this._$=_,this._c=[${codeMap}]};${runtimeMethods}`

    let proxy="";
    if(this.extenals&&this.extenals.length){
        const getter=this.extenals.map(v=>
    `if(property==="${v}"){
        return window["${v}"]//此处请按照实际情况处理内置代码需要获取变量${v}时情况
    }`).join("\n")
        const setter=this.extenals.map(v=>
    `if(property==="${v}"){
        window["${v}"]=value//此处请按照实际情况处理内置代码需要设置变量${v}的值时情况,如果确信你的代码中没有对此值进行赋值操作，可忽略此set方法
    }`).join("\n")    
        proxy=`
//你的代码中使用了未定义的变量值，为代码能正确运行，请手工完成下面的代码，设置这些值的获取和赋值方法
const envProxy=new Proxy({},{
    get(target,property){
    ${getter}
    return undefined
    },
    set(target,property,value){
    ${setter}else{
        target[property]=value
    }
    return true;
    }
})
       `     
    }


    return declearation+"\n const bytecodes=["+code+"]\n"+proxy+"\nnew Runtime(bytecodes,0"+(proxy?",envProxy":"")+").run()"
}


export default Runtime