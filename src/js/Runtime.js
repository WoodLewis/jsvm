function Runtime(){
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
}

Runtime.prototype.run=function(){
    this.pointer=this.codeOffset
    while(this.pointer<this.code.length){
        this.codeMap[this.code[this.pointer]](this)
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
    return val
}

Runtime.prototype.newStack=function(){
    this.stack[this.stack.length]=[]
    this.stackArray[this.stackArray.length]=[]
}

Runtime.prototype.delStack=function(){
    this.stack.pop()
    this.stackArray.pop()
}

Runtime.prototype.nextCodeNVal=function(n){
    return this.code[this.pointer+n]
}
Runtime.prototype.nextCodeVal=function(){
    return this.code[this.pointer+1]
}

Runtime.prototype.storeStackValue=function(stack,index,val){
    return this.stackArray[stack][index]=val
}

Runtime.prototype.visitStackVal=function(stack,index){
    return this.stackArray[stack][index]
}

Runtime.prototype.pushStack=function(obj){
    const st=this.stack[this.stack.length-1]
    return st.push(obj)
}

Runtime.prototype.popStackTop=function(){
    const st=this.stack[this.stack.length-1]
    return st.pop()
}

Runtime.prototype.dupStackTop=function(){
    const st=this.stack[this.stack.length-1]
    const val=st[st.length-1]
    st.push(val)
    return val
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
    return this.constants[index]
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


function replaceBlank(str){
    return  str.replace(/\/\/[^\n]*\n/g,"")
    .replace(/[\n\s]*\{[\s\r\n]*([a-zA-Z0-9_$])/g,"{$1")
    .replace(/([a-zA-Z0-9_$;\]])[\s\r\n]*\}[\n\s]*/g,"$1}")
    .replace(/\s+([+\-*/%=><])\s+/g,"$1")
    .replace(/\s+([=!><]+=)\s+/g,"$1")
    .replace(/([a-zA-Z0-9_;])(\s+)?[\n\r]+(\s+)?([a-zA-Z0-9_;])/g,"$1;$4")
    .replace(/;；+/g,";")
    .replace(/;}/g,"}")
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
    let constants=this.constants.map(v=>'"'+v.replaceAll('"','\\"')+'"').join(",")
    let codeMap=this.codeMap.toString().replace(/function\s+_apply\(runtime\)/g,"function(runtime)")

    codeMap=replaceMethods(replaceBlank(codeMap))
    let runtimeMethods="";
    for(let i=0;arr[i];++i){
        runtimeMethods+=";Runtime.prototype.__"+i+"="+replaceMethods(replaceBlank(Runtime.prototype[arr[i]].toString()))
    }
    runtimeMethods+=";Runtime.prototype.run="+replaceBlank(Runtime.prototype.run.toString())
    let str=`function Runtime(){
        this.stack=[],this.stackArray=[], this.pointer=0,this.temp=[]
        this.codeOffset=0,this.constants=[${constants}]
        this.code=[${code}],this.env={},this.retVal=null,this.codeMap=[${codeMap}]
    }${runtimeMethods}
    new Runtime().run()
    `
   
    return str
}


export default Runtime