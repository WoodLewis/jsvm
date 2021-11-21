function Runtime(){
    this.stack=[]
    this.stackArray=[]
    this.pointer=[]
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

export default Runtime