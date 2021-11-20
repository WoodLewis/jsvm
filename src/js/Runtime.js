export function Runtime(){
    this.stack=[]
    this.stackArray=[]
    this.pointer=[]
    this.temp=[]
    this.codeOffset=0
    this.constants=[]
    this.code=[]
}

Runtime.prototype.newStack=function(){
    return this.stackArray.push([])
}

Runtime.prototype.delStack=function(){
    return this.stackArray.pop()
}

Runtime.prototype.nextCodeNVal=function(n){
    return this.code[this.pointer+n]
}
Runtime.prototype.nextCodeVal=function(){
    return this.code[this.pointer+1]
}

Runtime.prototype.storeStackValue=function(stack,index,val){
    return this.stackArray[stack,index]=val
}

Runtime.prototype.visitStackVal=function(stack,index){
    return this.stackArray[stack,index]
}

Runtime.prototype.pushStack=function(obj){
    const stack=this.stack[this.stack.length-1]
    return stack.push(obj)
}

Runtime.prototype.popStackTop=function(){
    const stack=this.stack[this.stack.length-1]
    return stack.pop()
}

Runtime.prototype.popStackTopN=function(N){
    const stack=this.stack[this.stack.length-1]
    const arr=[]
    for(let i=N;i>0;--i){
        arr[i-1]= stack.pop()
    }
    return arr
}
Runtime.prototype.popStackCodeTopN=function(){
    return this.popStackTopN(this.code[this.pointer])
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
    this.pointer+=1
    this.goto(this.code[this.pointer])
}