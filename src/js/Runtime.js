function Runtime(bytecodes,codeoffset,env,target){
    this.extenals=[]
    this.errorMap=[]
    this.stack=[]
    this.stash=[]
    this.stackArray=[]
    this.pointer=0
    this.codeOffset=codeoffset||0
    this.code=bytecodes?(this.checkHasProperty(bytecodes,1)?bytecodes:bytecodes[0].map((v,i)=>v-((i&0xff00)?i:0xff))):[]
    this.env=env||{}
    this.$this=target||this
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
        console.error(this.error)
        throw new Error(this.error.name+":"+this.error.message)
    }
    return this.retVal
}

Runtime.prototype.retValue=function(retVal){
    return this.retVal=retVal
}

Runtime.prototype.movToStash=function(){
    this.stash.push(this.popStackTop())
}
Runtime.prototype.movfromStash=function(){
    this.pushStack(this.stash.pop())
}

Runtime.prototype.gotoEnd=function(){
    return this.pointer=this.code.length
}
Runtime.prototype.checkHasProperty=function(_t,_p){
    return Object.prototype.hasOwnProperty.call(_t,_p);
}

Runtime.prototype.envObject=function(name){
    return this.checkHasProperty(this.env,name)?
        this.env[name]:(
            this.checkHasProperty(this.$this,name)?this.$this[name]:(
                this.checkHasProperty(window,name)?window[name]:undefined
            )
        )
}

Runtime.prototype.pushBackEnv=function(name,val){
    this.checkHasProperty(this.env,name)?(this.env[name]=val):(window[name]=val)
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

Runtime.prototype.visitContextValSelective=function($a){
    for(let i=0;$a[i];++i){
        if(this.contextMap[$a[i][0]].length>$a[i][1]){
            return [1,this.contextMap[$a[i][0]][$a[i][1]]]
        }
    }
    return [0,null]
}

Runtime.prototype.storeContextVal=function(stack,index,val){
    this.contextMap[stack][index]=val
}

Runtime.prototype.storeContextVarSelective=function($a,val){
    for(let i=0;$a[i];++i){
        if(this.contextMap[$a[i][0]].length>$a[i][1]){
            this.contextMap[$a[i][0]][$a[i][1]]=val
            return $a[i]
        }
    }
    return null
}
Runtime.prototype.pushStack=function(obj){
    this.arrTop(this.stack).push(obj)
}

Runtime.prototype.popStackTop=function(){
    return this.arrTop(this.stack).pop()
}
Runtime.prototype.fromCharCode=function(c){return String.fromCharCode(c)}

Runtime.prototype.dupStackTop=function(){
    const st=this.arrTop(this.stack)
    st.push(st[st.length-1])
}
Runtime.prototype.arrTop=function(arr){
    return arr[arr.length-1]
}

Runtime.prototype.popStackTopN=function(n){
    const st=this.arrTop(this.stack)
    const arr=[]
    for(let i=n;i>0;--i){
        arr[i-1]= st.pop()
    }
    return arr
}
Runtime.prototype.popStackCodeTopN=function(){
    return this.popStackTopN(this.code[this.pointer+1])
}
Runtime.prototype.inarray=function(v){
    return (v>34&&v<39&&v!=37)||(v>41&&v<48)||v==58||v==61||(v>62&&v<91)||(v>=95&&v<=122&&v!=96)
}

Runtime.prototype.loadConstant=function(index){
    return decodeURI( this.loadCodeArray(index,this.code[index-1]).map(v=>v+0x14).map(v=>this.inarray(v)?this.fromCharCode(v):(this.fromCharCode(37)+this.toString16(v))).join(''))
    
}

Runtime.prototype.loadCodeArrayN=function(index){
    const _=index+this.codeOffset+1
    return this.code.slice(_,_+this.code[index+this.codeOffset])
}

Runtime.prototype.loadCodeArray=function(start,end){
    return this.code.slice(this.codeOffset+start,this.codeOffset+end)
}

Runtime.prototype.toString16=function(_){
    return _.toString(16)
}

Runtime.prototype.toInt=function(_){
    return Number.parseInt(_)
}

Runtime.prototype.next=function(len){
    this.pointer+=len
}

Runtime.prototype.toFloat=function(_){
    return Number.parseFloat(_)
}

Runtime.prototype.loadThis=function(){
    return this.$this
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
        const nr= new Runtime(_b,0,that.env,this!==window?this:null)
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
    return func
        .replace(/(this|that|nr)\.extenals\s*=\s*\[\];?/g,"")
        .replace(/(this|that|nr|\)|\])\.stackArray/g,"$1._a")
        .replace(/(this|that|nr|\)|\])\.stack/g,"$1._s")
        .replace(/(this|that|nr|\)|\])\.stash/g,"$1._а")//这个是俄文字母
        .replace(/(this|that|nr|\)|\])\.env/g,"$1._e")
        .replace(/(this|that|nr|\)|\])\.\$this/g,"$1._t")
        .replace(/(this|that|nr|\)|\])\.pointer/g,"$1._p")
        .replace(/(this|that|nr|\)|\])\.codeMap/g,"$1._c")
        .replace(/(this|that|nr|\)|\])\.codeOffset/g,"$1._o")
        .replace(/(this|that|nr|\)|\])\.errorMap/g,"$1._m")
        .replace(/(this|that|nr|\)|\])\.error/g,"$1._е")//这个是俄文字母
        .replace(/(this|that|nr|\)|\])\.code/g,"$1._")
        .replace(/(this|that|nr|\)|\])\.retVal/g,"$1.х")//这个是俄文字母
        .replace(/(this|that|nr|\)|\])\.accesstors/g,"$1.$_")
        .replace(/(this|that|nr|\)|\])\.contextMap/g,"$1._о")//这个是俄文字母
        .replaceAll("stack","$ǃ")
        .replaceAll("index","$1")
        .replaceAll("name","$ǀ")
        .replaceAll("retVal","$$")
        .replaceAll("val","$_")
        .replaceAll("that","$t")
        // .replaceAll("checkHasProperty","_")
}

Runtime.prototype.declearation=function(){
    const prototypes=Object.getOwnPropertyNames(Runtime.prototype)
    const arr=[]
    for(let i=0;prototypes[i];++i){
        switch(prototypes[i]){
            case "constructor":
            case "toString":
            case "run":
            case "declearation": 
            case "newInstance":   
                break;
            default: arr.push(prototypes[i]);break;   
        }
    }
    const replaceMethods=function(str){
        for(let i=0;arr[i];++i){
            str=str
                .replaceAll("this."+arr[i]+"(","this.__"+i.toString(36)+"(")
                .replaceAll("runtime."+arr[i]+"(","runtime.__"+i.toString(36)+"(")
                .replaceAll("nr."+arr[i]+"(","nr.__"+i.toString(36)+"(")
                .replaceAll("v."+arr[i]+"(","v.__"+i.toString(36)+"(")
        }
        return str.replace(/console\.(log|error)\([\w.\s]+\);?/g,"")
            .replace(/\(function(\([^)]*\))\{return ([^}]+)\}\)/g,"($1=>$2)")
            .replace(/\(function(\([^)]*\))\{/g,"($1=>{")
            .replace(/\(([a-zA-Z0-9]+)\)=>/g,"$1=>")
    }
 
    let codeMap=this.codeMap.toString()
        .replace(/function\s+_apply\(runtime\)/g,"r=>");
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
        .replaceAll("args","_ǀ")
        .replaceAll("array","_ǃ")
        .replaceAll("val","_Ӏ")
        .replaceAll("alterName","_ı")
        .replaceAll("selective","_ί")
        .replace(/var\s+([_\w]+)=([^;]+);var\s+([_\w]+)=/g,"var $1=$2,$3=")
        .replace(/if\(([^()]+)\)\{([^}]+)\}else\{([^}]+)\}/g,"($1)?($2):($3);")
   
    const runtimeMethods="Runtime.prototype={"+
        arr.map((v,i)=> "__"+i.toString(36)+":"+reloaceLocalVar(replaceMethods(replaceBlank(Runtime.prototype[v].toString())))).join(",")+
        ",run:"+reloaceLocalVar(replaceBlank(replaceMethods(Runtime.prototype.run.toString())))+
        "};"
    // const declearation= `function Runtime(_,__,___,$){this.$a=[],this.$c=[],this._s=[],this._a=[],this._em=[],this._p=0,this.$=this.$e=null,this.$t=$||this,this._e=___||{},this._o=__||0,this._$=_,this._c=[${codeMap}]};${runtimeMethods}`
    return reloaceLocalVar(replaceMethods(Runtime.prototype.constructor.toString()))
            .replace(/[\n\r\t\s]*([{}[\]}();]+)[\n\r\t\s]*/g,"$1")//去除[]{}();的前后空白
            .replace(/\s*([<>,?()+\-*/:&])\s*/g,"$1")
            .replace(/function\(([\w,\s]+)\)\{\s*return\s+([^;]+);?\}/,"($1)=>$2")
            .replaceAll("bytecodes","_")
            .replaceAll("codeoffset","$")
            .replaceAll("env","__")
            .replaceAll("target","$_")
            .replace(/this\._c\s*=\s*\[\]/g,"this._c=["+codeMap+"]")
            +";"+runtimeMethods
}

Runtime.prototype.newInstance=function(){
    let code=this.code
    let proxy="";
    if(this.extenals&&this.extenals.length){
        const setter=this.extenals.map(v=>`case "${v}":window["${v}"]=value;break;//此处请按照实际情况处理内置代码需要设置变量${v}的值时情况,如果确信你的代码中没有对此值进行赋值操作，可忽略此set方法`).join("\n")    
        proxy=`//你的代码中使用了未定义的变量值，为代码能正确运行，请手工完成下面的代码，设置这些值的获取和赋值方法
const envProxy=new Proxy({${this.extenals.map(v=>v+":window[\""+v+"\"]").join(",")}},{
    set(target,property,value){
        switch(property){
            ${setter}
            default:target[property]=value;
        }
    return true;
    }
})`     
    }
    // return "const bytecodes=["+code.map((v,i)=>{v+=(i<255?255:i);return (v<255)?v:("0x"+v.toString(16))}).join(",")+"]\n"+
    //         proxy+
    //         "\nconst runtime=new Runtime([bytecodes],0"+(proxy?",envProxy":"")+");\nruntime.run()"
    return proxy+ "\nconst runtime=new Runtime(["+code.map(v=>"0x"+v.toString(16))+"],0"+(proxy?",envProxy":"")+");\nruntime.run()"
}

Runtime.prototype.toString=function(){
    return '/* 公共代码部分是不变的，可以独立写入一个文件再引入 */\n/* 公共代码部分开始 */\n'+
        this.declearation()+
        "\n/*公共代码部分结束*/"+
        "\n\n\n//下面的部分是左侧代码加密后的源码，同样的代码两次转换的结果不同但等效\n"+
        this.newInstance()
}


export default Runtime