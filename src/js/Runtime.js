function Runtime(){
    this.errorMap=[]
    this.stack=[]
    this.stackArray=[]
    this.pointer=0
    this.temp=[]
    this.codeOffset=0
    this.constants=[]
    this.code=[]
    this.env={}
    this.retVal=null
    this.codeMap=[]
    this.error=null
}

Runtime.prototype.run=function(){
    this.pointer=this.codeOffset
    while(this.pointer<this.code.length){
        try{
            this.codeMap[this.code[this.pointer]](this)
        }catch(e){
            this.error=e;
            this.throwError()
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

Runtime.prototype.envObject=function(name){
    if(this.env[name]===undefined){
        return window[name]
    }
    return this.env[name]
}

Runtime.prototype.pushBackEnv=function(name,val){
    if(this.env[name]===undefined){
        window[name]=val
    }
    this.env[name]=val
    return this
}

Runtime.prototype.newStack=function(){
    this.stack[this.stack.length]=[]
    this.stackArray[this.stackArray.length]=[]
    return this
}

Runtime.prototype.delStack=function(){
    this.stack.pop()
    this.stackArray.pop()
    return this
}

Runtime.prototype.nextCodeNVal=function(n){
    return this.code[this.pointer+n]
}
Runtime.prototype.nextCodeVal=function(){
    return this.code[this.pointer+1]
}

Runtime.prototype.storeStackValue=function(stack,index,val){
    this.stackArray[stack][index]=val
    return this
}

Runtime.prototype.visitStackVal=function(stack,index){
    return this.stackArray[stack][index]
}

Runtime.prototype.pushStack=function(obj){
    this.stack[this.stack.length-1].push(obj)
    return this
}

Runtime.prototype.popStackTop=function(){
    return this.stack[this.stack.length-1].pop()
}

Runtime.prototype.dupStackTop=function(){
    const st=this.stack[this.stack.length-1]
    st.push(st[st.length-1])
    return this
}

Runtime.prototype.popStackTopN=function(N){
    const st=this.stack[this.stack.length-1]
    const arr=[]
    for(let i=N;i>0;--i){
        arr[i-1]= st.pop()
    }
    return arr
}
Runtime.prototype.popStackCodeTopN=function(){
    return this.popStackTopN(this.code[this.pointer+1])
}

Runtime.prototype.loadConstant=function(index){
    const s=this.code.slice(index,this.code[index-1])
    s.forEach((v,i,r)=>r[i]=String.fromCharCode(v^i))
    return s.join('')
}

Runtime.prototype.next=function(len){
    this.pointer+=len
    return this
}

Runtime.prototype.goto=function(index){
    this.pointer=index+this.codeOffset
    return this
}

Runtime.prototype.jmp=function(){
    this.goto(this.code[this.pointer+1])
    return this
}

Runtime.prototype.exit=function(){
    this.goto(this.code.length)
    return this
}

Runtime.prototype.loadError=function(){
    this.pushStack(this.error)
    this.error=null
    return this
}
Runtime.prototype.setError=function(){
    this.error=this.popStackTop()
    return this
}

Runtime.prototype.throwError=function(){
    for(let i=0;this.errorMap[i];++i){
        if(this.errorMap[i][0]<=this.pointer&&this.pointer<this.errorMap[i][1]){
            this.goto(this.errorMap[i][2])
            return this;
        }
    }
    this.exit()
    return this
}


function replaceBlank(str){
    return  str.replace(/\/\/[^\n]*\n/g,"")
    .replace(/[\n\s]*\{[\s\r\n]*([a-zA-Z0-9_$])/g,"{$1")
    .replace(/([a-zA-Z0-9_$;\]])[\s\r\n]*\}[\n\s]*/g,"$1}")
    .replace(/[\n\s]+([+\-*/%=><])[\n\s]+/g,"$1")
    .replace(/[\n\s]*,[\n\s]*/g,",")
    .replace(/([a-zA-Z0-9])\s+\(/g,"$1(")
    .replace(/\s+([=!><]+=)\s+/g,"$1")
    .replace(/([a-zA-Z0-9_;])(\s+)?[\n\r]+(\s+)?([a-zA-Z0-9_;])/g,"$1;$4")
    .replace(/;{2,}/g,";")
    .replace(/;}/g,"}")
}

function reloaceLocalVar(func){
    return func.replaceAll("this.stackArray","this._a")
    .replaceAll("this.env","this._e")
    .replaceAll("this.stack","this._s")
    .replaceAll("this.pointer","this._p")
    .replaceAll("this.codeMap","this._c")
    .replaceAll("this.codeOffset","this._o")
    .replaceAll("this.errorMap","this._em")
    .replaceAll("this.code","this._$")
    .replaceAll("stack","$0")
    .replaceAll("index","$1")
    .replaceAll("name","$2")
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
        }
        return str
    }
    let code=this.code
    let codeMap=this.codeMap.toString()
        .replace(/function\s+_apply\(runtime\)/g,"function(r)")
    //替换一些常用的变量值   
    codeMap=replaceMethods(replaceBlank(codeMap)).replaceAll("runtime.__","r.__")
        .replaceAll("index","_i")
        .replaceAll("target","_t")
        .replaceAll("property","_p")
        .replaceAll("left","_")
        .replaceAll("right","__")
        .replaceAll("className","_n")
        .replaceAll("objName","_on")
        .replaceAll("methodName","_mn")
        .replace(/var\s+([_\w]+)=([^;]+);var\s+([_\w]+)=/g,"var $1=$2,$3=")
        .replace(/if\(([^()]+)\)\{([^}]+)\}else\{([^}]+)\}/g,"($1)?($2):($3);")
    let runtimeMethods="([";
    for(let i=0;arr[i];++i){
        runtimeMethods+="{__"+i+":"+
            reloaceLocalVar(replaceMethods(replaceBlank(Runtime.prototype[arr[i]].toString())))
            +"},"
    }
    runtimeMethods+="{run:"+reloaceLocalVar(replaceBlank(replaceMethods(Runtime.prototype.run.toString())))+"}]).forEach(v=>{for(var i in v){Runtime.prototype[i]=v[i]}})"
    const errMap=this.errorMap.map(v=>"["+v+"]").join(",")
   
    return `function Runtime(){this._s=[],this._a=[],this._p=0,this.temp=[],this._em=[${errMap}],this._o=0,this._$=[${code}],this._e={},this.retVal=null,this._c=[${codeMap}]
};${runtimeMethods}
new Runtime().run()
`
}


export default Runtime