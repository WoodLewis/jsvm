import bydecodeDef from './CodeDefine'
import Runtime from "./Runtime"



class __JSVM {
    constructor() {
        this.sourceCode=null
        this.name=null
        this.args=[]
        this.type="Program"
         /** 字符串常亮库 */
        this.consts = []
        this.argsLength=0;
        this.vars = []
        this.contextVars = []
        this.contextVarsMap = {}
        this.map = []
        this.code = []
        this.catch= []
        /** 需要外部引入的数据 */
        this.extenals=[]
        this.anccesstors=[]
        this.localMethods=[]
        this.import=[]
    }
}

class __Tag {
    constructor(name) {
        this.name = name
        this.listeners = []
    }
    addListener(listener) {
        this.listeners.push(listener)
    }
    setIndex(index) {
        for (let i = 0; this.listeners[i]; ++i) {
            this.listeners[i][1] = index
        }
    }
}

__JSVM.prototype.logExtenals = function (name) {
    for(let i=0;this.extenals[i];++i){
        if(this.extenals[i]===name){
            return i;
        }
    }
    this.extenals.push(name)
    return [-1, -1]
}

__JSVM.prototype.newBlock = function () {
    this.vars.push([])
    this.map.push(0)
    return [-1, -1]
}

__JSVM.prototype.qiutBlock = function () {
    this.vars.pop()
    this.map.pop()
    return [-1, -1]
}
__JSVM.prototype.findVar = function (name) {
    for (let i = this.vars.length - 1; i >= 0; --i) {
        if (this.vars[i][name] != undefined) {
            return this.vars[i][name]
        }
    }
    return [-1, -1]
}

__JSVM.prototype.addConstr = function (val) {
    for (let i = 0; this.consts[i]; ++i) {
        if (this.consts[i] === val) {
            return i;
        }
    }
    this.consts.push(val)
    return this.consts.length - 1
}

__JSVM.prototype.addVar = function (name) {

    const stack = this.vars.length - 1
    const index = this.map[stack]
    this.vars[stack][name] = [stack, index]
    this.map[stack] = this.map[stack] + 1
    return [stack, index]
}

__JSVM.prototype.findVar = function (name) {
    for (let i = this.vars.length - 1; i >= 0; --i) {
        if (this.vars[i][name] != undefined) {
            return this.vars[i][name]
        }
    }
    return [-1,-1]
}

__JSVM.prototype.findContextVar = function (name) {
    if(this.contextVars[name]){
        return this.contextVars[name]
    }
    for (let i = 0; this.anccesstors[i]; ++i) {
        const find=this.anccesstors[i].findVar(name)
        if(find&&find[0]!=-1){
            let nextIndex=0;
            const storeKey=i+'-'+find[0]
            if(!Object.prototype.hasOwnProperty.call(this.contextVarsMap,storeKey)){
                nextIndex=Object.getOwnPropertyNames(this.contextVarsMap).length
                this.import.push([i,find[0]])
                // this.code.push([bydecodeDef.loadContext,i,find[0]])
                this.contextVarsMap[storeKey]=nextIndex
            }else{
                nextIndex=this.contextVarsMap[storeKey]
            }
            this.contextVars[name]=[nextIndex,find[1]]
            return [nextIndex,find[1]]
        }
    }
    return [-1,-1]
}

__JSVM.prototype.compile = function () {
   let data=[]
   const codePositonTag=[]
   const codeMap=[]
   const constantsLocation=[]
   const constantsLocationTag=[]
   const functionCodesLocation=[]
   //简单考虑下安全问题，将常量字符串织入代码中
   const constantsMap=[]
   for(let i=0;i<this.consts.length;++i){
        constantsLocationTag[i]=[]
        let insert=parseInt(Math.random()*(this.code.length-1))
        if(insert<=0){
            insert=1;
        }
        if(!constantsMap[insert]){
            constantsMap[insert]=[]
        }
        constantsMap[insert].push(i)
   }

   const loadCodePositionTag=function (source,target){
    if(!codePositonTag[source]){
        codePositonTag[source]=[]
    }
    codePositonTag[source].push(target)
   }
   //插入异常处理映射表
   data.push(bydecodeDef.noopN.val)
   data.push(this.catch.length*3)
   const errorMapStart=data.length
   const catchArray=this.catch.map(v=>v).sort((a,b)=>b[0]-a[0])
   for(let i=0;i<catchArray.length;++i){
       const map=catchArray[i]
       loadCodePositionTag(map[0],data.length)
       loadCodePositionTag(map[1],data.length+1)
       loadCodePositionTag(map[2],data.length+2)
       data=data.concat(map)
   }
   data.push(bydecodeDef.loadErrorMap.val)
   data.push(errorMapStart)
   data.push(catchArray.length)

   for(let i=0;this.code[i];++i){
       codeMap[i]=data.length
       const ins=this.code[i]
       data.push(ins[0].val)
       //记录跳转代码位置
       switch(ins[0].val){
           //记录跳转代码地址变更
            case bydecodeDef.jmp.val:
            case bydecodeDef.jmpNotZero.val:
            case bydecodeDef.jmpZero.val:
            case bydecodeDef.eqJmp.val:
            case bydecodeDef.neqJmp.val:{
                loadCodePositionTag(ins[1],data.length)
            }break;
            //记录字符串加载位置变更
            case bydecodeDef.loadConst.val:
            case bydecodeDef.loadEnv.val:   
            case bydecodeDef.newClassObject.val: 
            case bydecodeDef.callFunc.val: 
            case bydecodeDef.storeEnv.val:
                constantsLocationTag[ins[1]].push(data.length)
                break;
            case bydecodeDef.memberMethod.val:
                constantsLocationTag[ins[2]].push(data.length+2)
                break;      
            case bydecodeDef.envMemberMethod.val:{
                constantsLocationTag[ins[1]].push(data.length)
                constantsLocationTag[ins[2]].push(data.length+1)
                }break;
            //记录内部函数分配    
            case bydecodeDef.loadFuncDef.val:{
                if(!functionCodesLocation[ins[1]]){
                    functionCodesLocation[ins[1]]=[]
                }
                functionCodesLocation[ins[1]].push(data.length)
            }
        }
       for(let j=1;j<ins.length;++j){
           if(typeof ins[j]==="number"){
            data.push(ins[j])
           }else if(ins[j] instanceof Array){
            for(let k=0;k<ins[j].length;k++){
                data.push(ins[j][k])
            }
           }else{
               break;//跳过解释代码
           }
       }
       if(constantsMap[i]){//将常量字符串织入代码中
        const inserts=constantsMap[i]
        for(let j=0;j<inserts.length;++j){
            const insertStr=this.consts[inserts[j]]
            const strArray=stringToBytes(insertStr)
            const jmp=([bydecodeDef.jmp.val,data.length+2+strArray.length]).concat(strArray)
            constantsLocation[inserts[j]]=data.length+2
            data=data.concat(jmp);
        }
       }
   }
    //更新代码跳转位置
    codeMap[this.code.length]=data.length
    for(let p in codePositonTag){
        const update=codePositonTag[p]
        update.forEach(v=>{
            data[v]=codeMap[p]
        })
    }
    //更新字符串加载位置变更
    for(let p in constantsLocationTag){
        const update=constantsLocationTag[p]
        update.forEach(v=>{
            data[v]=constantsLocation[p]
        })
    }
    //将函数数据追加到代码末尾
   let functionCodes=[]
   const startLocation=data.length+2;
   for(let i=0;i<this.localMethods.length;++i){
       if(!functionCodesLocation[i]){
           continue;
       }
       const currentLocation=startLocation+functionCodes.length
       functionCodesLocation[i].forEach(v=>{
           data[v]=currentLocation
       })
        const funcCode=this.localMethods[i].compile().code
        functionCodes.push(funcCode.length)
        functionCodes=functionCodes.concat(funcCode)
   }

   data.push(bydecodeDef.noopN.val)
   data.push(functionCodes.length)
   data=data.concat(functionCodes)


   const runtime=new Runtime()
   runtime.code=data
   const codeMethod=[]
   for(let code in bydecodeDef){
       const ins=bydecodeDef[code]
       codeMethod[ins.val]=ins._apply
   }
   runtime.codeMap=codeMethod
   runtime.extenals=this.extenals.filter(v=>!window[v])
   return runtime
}

function stringToBytes(str){
    const array=[]
    for(let i=0;i<str.length;++i){
        //来一点简单的加密
        array.push(str.charCodeAt(i)^i)
    }
    return array
}

function accept(sourcecode,node) {
    const vm = new __JSVM();
    vm.sourceCode=sourcecode
    vm.newBlock()
    const startPosition=checkCurrentIndex(vm)
    vm.code.push([bydecodeDef.newStack])
    blockStatement(vm, node)
    const endPosition=checkCurrentIndex(vm)
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()
    loadErrorBlockClean(vm,startPosition,endPosition)
    const code=[]
    //刷新标记点
    for (let i = 0;vm.code[i];++i) {
        const bc=vm.code[i]
        if(bc instanceof Array){
            code.push(bc)
        }else{
            bc.setIndex(code.length)
        }
    }
    vm.code=code
    return vm
}

function acceptFunction(parent,node) {
    const vm = new __JSVM();
    vm.type="Function"
    vm.sourceCode=parent.sourceCode
    vm.name=node.id?node.id.name:null
    vm.anccesstors=[parent].concat(parent.anccesstors)
   
    vm.newBlock()//此处要自动多一处记录stack，用于记录参数
    //加载参数记录
    const params=node.params
    if(params&&params.length){
        vm.argsLength=params.length
        for(let i=0;params[i];++i){
            const param=params[i]
            const paramName=param.name
            vm.addVar(paramName)
            vm.args.push(paramName)
        }
    }
    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    const startPosition=checkCurrentIndex(vm)
    blockStatement(vm, node.body)
    const endPosition=checkCurrentIndex(vm)
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()
    vm.code.push([bydecodeDef.delStack])//此处要自动多删除一个stack，因为创建函数时会自动创建参数stack
    vm.qiutBlock()
    //清理过程也要多清一个stack
    const jmp=new __Tag("normalJump")
    jumpToTag(vm,jmp)//这里只允许跳转进来，其他时候要跳过
    const throwPosition=checkCurrentIndex(vm)
    vm.code.push([bydecodeDef.delStack])//处理异常前需要先把正常代码块卸载
    vm.code.push([bydecodeDef.delStack])
    vm.code.push([bydecodeDef.throwError])
    vm.catch.push([startPosition,endPosition,throwPosition])
    vm.code.push(jmp)
    const code=[]
    //刷新标记点
    for (let i = 0;vm.code[i];++i) {
        const bc=vm.code[i]
        if(bc instanceof Array){
            code.push(bc)
        }else{
            bc.setIndex(code.length)
        }
    }
    vm.code=code
    return vm
}


function jumpToTag(vm, tag) {
    const jmpTo = [bydecodeDef.jmp, 0, tag, '//jump to Tag, refresh position after finish compile']
    vm.code.push(jmpTo)
    tag.addListener(jmpTo)
}

function blockStatement(vm, node, blockStartTag, blockEndTag) {
    if (node.type == "ContinueStatement") {
        jumpToTag(vm, blockStartTag)
        return
    } else if (node.type == "BreakStatement") {
        jumpToTag(vm, blockEndTag)
        return
    }
    let body = node.body
    //处理单一语句的情况
    if(!body){
        body=[node]
    }else  if(!(body instanceof Array)){
        body=[body]
    }
    
    for (let i = 0; body[i]; ++i) {
        loadBlockBody(vm,body[i], blockStartTag, blockEndTag)
    }
}

function loadBlockStatement(vm,node, blockStartTag, blockEndTag){
    if(!(node.type=== "BlockStatement")){
        loadBlockBody(vm, node, blockStartTag, blockEndTag)
        return 
    }
    const blockStart = new __Tag("nestBlockStart")
    const blockEnd = new __Tag("nestBlockStart")
   
    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])

    const startPosition=checkCurrentIndex(vm)
    let body = node.body
    for (let i = 0; body[i]; ++i) {
        loadBlockBody(vm,body[i], blockStartTag, blockEndTag)
    }
    vm.code.push([bydecodeDef.delStack])     
    vm.qiutBlock()
    loadErrorBlockClean(vm,startPosition,checkCurrentIndex(vm))

    if(blockStartTag||blockEndTag){
        const nextCode = new __Tag("GoToNextCode")
        jumpToTag(vm,nextCode)
        if(blockStartTag){
            vm.code.push(blockStart)
            vm.code.push([bydecodeDef.delStack])
            jumpToTag(vm,blockStartTag)
        }
        if(blockEndTag){
            vm.code.push(blockEnd)
            vm.code.push([bydecodeDef.delStack])
            jumpToTag(vm,blockEndTag)
        }
        vm.code.push(nextCode)
    }
}

function loadBlockBody(vm,body, blockStartTag, blockEndTag){
    const type = body.type
    switch (type) {
        case "ContinueStatement": jumpToTag(vm, blockStartTag);break;
        case "BreakStatement": jumpToTag(vm, blockEndTag);break;
        case "FunctionDeclaration":{
            const funcNode=body
            if(funcNode.id&&funcNode.id.name){
                const funcName=funcNode.id.name
                const curStack = vm.vars[vm.vars.length - 1]
                let idx = curStack[funcName]
                if (!idx) {
                    idx = vm.addVar(funcName)
                }
                defFunction(vm,funcNode)
                vm.code.push([bydecodeDef.storeVar,idx])
            }
        }break;
        case "ReturnStatement":returnStatement(vm,body);break;
        case "VariableDeclaration": {
            const vars = body.declarations
            for (let k = 0; vars[k]; ++k) {
                VariableDeclarator(vm, vars[k])
            }
        } break;
        case "BlockStatement": {
            loadBlockStatement(vm,body,blockStartTag,blockStartTag)
        } break;
        case "ExpressionStatement": {
            loadValueWithTag(vm,body.expression)
            vm.code.push([bydecodeDef.movRet])
        } break;
        case "ForStatement": {
            forStatement(vm, body)
        } break;
        case "IfStatement": {
            ifStatement(vm, body, blockStartTag, blockEndTag)
        } break;
        case "WhileStatement":{
            whileStatement(vm, body, blockStartTag, blockEndTag)
        }break;
        case "DoWhileStatement":{
            doWhileStatement(vm,body,blockStartTag,blockEndTag)
        }break;
        case "SwitchStatement" :{
            switchStatement(vm,body,blockStartTag,blockEndTag)
        }break;
        case "TryStatement":{
            tryStatement(vm,body,blockStartTag,blockEndTag)
        }break;
        case "ThrowStatement":{
            loadValueWithTag(vm,body.argument)
            vm.code.push([bydecodeDef.setError])
            vm.code.push([bydecodeDef.throwError])
        }break;
        case "EmptyStatement":break;
        default: throw new Error("unknow statement "+body.type)
    }
}



function defFunction(vm,funcNode){
    const nvm=acceptFunction(vm,funcNode);
    //TODO 如何处理函数定义时访问外部还没定义的变量呢？？？咋弄
    //TODO 暂时先定位为不允许访问在函数定义后才定义的变量
    const newExtenals=nvm.extenals
    //更新外部引用
    if(newExtenals&&newExtenals.length){
        newExtenals.forEach(v=>vm.logExtenals(v))
    }
    const imports=nvm.import
    vm.localMethods.push(nvm)
    const localMethodsIndex=vm.localMethods.length-1

    if(imports.length){
        for(let i=0;i<imports.length;++i){
            vm.code.push([bydecodeDef.cpContext,imports[i]])
        }
    }
    vm.code.push([bydecodeDef.mkArr,imports.length])
    vm.code.push([bydecodeDef.loadFuncDef,localMethodsIndex])
    vm.code.push([bydecodeDef.defFunc,nvm.argsLength])
}

function returnStatement(vm,node){
    if(node.argument){
        loadValueWithTag(vm,node.argument)
    }else{
        vm.code.push([bydecodeDef.loadNull])
    }
    vm.code.push([bydecodeDef.retFunc])
}

function VariableDeclarator(vm, node) {
    const name = node.id.name
    const curStack = vm.vars[vm.vars.length - 1]
    let idx = curStack[name]
    if (!idx) {
        idx = vm.addVar(name)
    }
    if(node.init){
        loadValueWithTag(vm,node.init)
        vm.code.push([bydecodeDef.storeVar, idx])
    }
  
    return idx
}

function loadValueWithTag(vm, node){
    const tag=new __Tag("varLoadTag")
    loadDefVar(vm,node,tag)
    vm.code.push(tag)
    return tag
}

function loadDefVar(vm, node,nextBlockTag) {
    const type = node.type
    if (type === "VariableDeclarator") {
        return VariableDeclarator(vm, node)
    }else if(type==="ObjectExpression"){
        vm.code.push([bydecodeDef.newObj])
        const ps=node.properties
        for(let i=0;ps[i];++i){
            vm.code.push([bydecodeDef.dupStack])
            vm.code.push([bydecodeDef.loadConst, vm.addConstr(ps[i].key.name)])
            loadValueWithTag(vm,ps[i].value)
            vm.code.push([bydecodeDef.rsetProp])
        }
        return null
    } else if (type === "Literal") {
        const val = node.value
        if((!val)&&node.raw=="null"){
            vm.code.push([bydecodeDef.loadNull])
            return ;
        }
        if((!val)&&node.raw=="undefined"){
            vm.code.push([bydecodeDef.loadUndefined])
            return ;
        }
        if (typeof val === 'number') {
            vm.code.push([bydecodeDef.loadValue, val])
        } else if (typeof val === 'string') {
            if(val){
                vm.consts.push(val);
                vm.code.push([bydecodeDef.loadConst, vm.addConstr(val)])
            }else{
                vm.code.push([bydecodeDef.loadBlank])
            }
        }
        return null
    } else if (type === "ArrayExpression") {
        const es = node.elements
        for (let i = 0; es[i]; ++i) {
            loadValueWithTag(vm,es[i])
        }
        vm.code.push([bydecodeDef.mkArr, es.length])
        return null
    } else if (type === "NewExpression") {
        return newExpression(vm, node)
    } else if (type === "CallExpression") {
        return callExpression(vm, node)
    } else if (type === "BinaryExpression") {
        return binaryExpression(vm, node)
    }else if(type==="UnaryExpression"){
        return unaryExpression(vm, node)
    } else if (type === "Identifier") {
        return loadIdentifier(vm, node)
    } else if (type == "SequenceExpression") {
        const es = node.expressions
        let lastIdx = null
        for (let i = 0; es[i]; ++i) {
            if (i > 0) {
                vm.code.push([bydecodeDef.popStack])
            }
            const esTag=new __Tag("esTag")
            lastIdx = loadDefVar(vm,es[i],esTag)
            vm.code.push(esTag)
        }
        return lastIdx
    } else if (type == "UpdateExpression") {
        const updataTag=new __Tag("updateTag")
        let idx = loadDefVar(vm, node.argument,updataTag)
        vm.code.push(updataTag)
        if (!node.prefix) {
            vm.code.push([bydecodeDef.dupStack])
        }
        switch (node.operator) {
            case "++": vm.code.push([bydecodeDef.inc]); break;
            case "--": vm.code.push([bydecodeDef.dec]); break;
        }
        if (node.prefix) {
            vm.code.push([bydecodeDef.dupStack])
        }
        if (node.argument.type == "Identifier") {
            if (idx && idx[0] != -1) {
                vm.code.push([bydecodeDef.storeVar, idx])
            }else{
                idx=vm.findContextVar(node.argument.name)
                if(idx[0]!=-1){
                    vm.code.push([bydecodeDef.storeContextVar,idx])
                }else{
                    vm.code.push([bydecodeDef.storeEnv, vm.addConstr(node.argument.name)])
                } 
            }
        } else if (node.argument.type == "MemberExpression") {
            const ag = node.argument
            loadValueWithTag(vm, ag.object)
            if(ag.property.type==="Identifier"){
                if(vm.sourceCode.charAt(ag.property.start-1)==='['){
                    loadValueWithTag(vm, ag.property)
                }else{
                    vm.code.push([bydecodeDef.loadConst, vm.addConstr(ag.property.name)])
                }
            }else{
                loadValueWithTag(vm, ag.property)
            }
            vm.code.push([bydecodeDef.setProp])
        }
        return idx

    } else if (type === "MemberExpression") {
        if(node.object.type==="Identifier"&&node.property.type==="Identifier"){
            const name = node.object.name
            let idx = vm.findVar(name)
            if (idx[0] === -1) {
                idx=vm.findContextVar(name)
                if(idx[0]!=-1){
                    vm.code.push([bydecodeDef.loadContextVal,idx])
                }else{
                    vm.logExtenals(name)
                    vm.code.push([bydecodeDef.loadEnv, vm.addConstr(name)])
                }
            } else {
                vm.code.push([bydecodeDef.loadVar, idx])
            }
            if(vm.sourceCode.charAt(node.property.start-1)==='['){
                loadValueWithTag(vm, node.property)
            }else{
                vm.code.push([bydecodeDef.loadConst, vm.addConstr(node.property.name)])
            }
        }else{
            loadValueWithTag(vm, node.object)
            if(node.property.type==="Identifier"){
                if(vm.sourceCode.charAt(node.property.start-1)==='['){
                    loadValueWithTag(vm, node.property)
                }else{
                    vm.code.push([bydecodeDef.loadConst, vm.addConstr(node.property.name)])
                }
            }else{
                loadValueWithTag(vm, node.property)
            }
        }

        vm.code.push([bydecodeDef.loadProp])
        return "cacl"
    }else if(type==="AssignmentExpression"){
        if(node.operator!=="="){
            loadValueWithTag(vm, node.left)
        }
        loadValueWithTag(vm, node.right)
        switch(node.operator){
            case "=":break;
            case "+=":vm.code.push([bydecodeDef.add]);break;
            case "-=":vm.code.push([bydecodeDef.min]);break;
            case "*=":vm.code.push([bydecodeDef.mul]);break;
            case "/=":vm.code.push([bydecodeDef.div]);break;
            case "%=":vm.code.push([bydecodeDef.mod]);break;
            case "^=":vm.code.push([bydecodeDef.nor]);break;
            case "|=":vm.code.push([bydecodeDef.byteOr]);break;
            case "&=":vm.code.push([bydecodeDef.byteAnd]);break;
            default: throw new Error("unknown operator "+node.operator)
        }
        
        vm.code.push([bydecodeDef.dupStack])
        const left=node.left
        if (left.type == "Identifier") {
            const name = left.name
            let idx = vm.findVar(name)
            if (idx[0] === -1) {
                idx=vm.findContextVar(name)
                if(idx[0]!=-1){
                    vm.code.push([bydecodeDef.storeContextVar,idx])
                }else{
                    vm.code.push([bydecodeDef.storeEnv,vm.addConstr(name)])
                }   
            } else {
                vm.code.push([bydecodeDef.storeVar, idx])
            }
            return idx
        } else if (left.type == "MemberExpression") {
            loadAssignmentMember(vm,left,true)
            return null
        }
        throw new Error("unknow AssignmentExpression type "+left.type)
    }else if(type==="LogicalExpression"){
        loadValueWithTag(vm, node.left)
        vm.code.push( [bydecodeDef.dupStack])
        if(node.operator==="||"){
            const jmpToNext = [bydecodeDef.jmpNotZero, 0, nextBlockTag, '//jump to logicalExpression, refresh position after finish compile']
            nextBlockTag.addListener(jmpToNext)
            vm.code.push(jmpToNext)
        }else if(node.operator==="&&"){
            const jmpToNext = [bydecodeDef.jmpZero, 0, nextBlockTag, '//jump to logicalExpression, refresh position after finish compile']
            nextBlockTag.addListener(jmpToNext)
            vm.code.push(jmpToNext)
        }else{
            throw new Error("unknow LogicalExpression operator "+node.operator)
        }
        loadValueWithTag(vm, node.right)
        return null
    }else if(type==="ConditionalExpression"){
        return conditionalExpression(vm,node,nextBlockTag)
    }else if(type==="FunctionExpression"){
        defFunction(vm,node)
        return null
    }
    
    throw new Error("unknown variable type " + type)
}


function loadAssignmentMember(vm,node,isTop){
   
    if(node.object.type==="Identifier"){
        loadIdentifier(vm, node.object)
    }else{
        loadAssignmentMember(vm,node.object,false)
    }
    
    if(node.property.type==="Identifier"){
        if(vm.sourceCode.charAt(node.property.start-1)==='['){
            loadValueWithTag(vm, node.property)
        }else{
            vm.code.push([bydecodeDef.loadConst,vm.addConstr(node.property.name)])
        }
    }else{
        loadValueWithTag(vm, node.property)
    }
    
    if(isTop){
        vm.code.push([bydecodeDef.setProp])
    }else{
        vm.code.push([bydecodeDef.loadProp])
    } 
}

function conditionalExpression(vm,node,retTag){
    loadValueWithTag(vm, node.test)

    const alterTag=new __Tag("alterTag")
    const jmpToAlter = [bydecodeDef.jmpZero, 0, alterTag, '//jump to return, refresh position after finish compile']
    alterTag.addListener(jmpToAlter)
    vm.code.push(jmpToAlter)

    loadValueWithTag(vm,node.consequent)

    const jmpToRet = [bydecodeDef.jmp, 0, retTag, '//jump to return, refresh position after finish compile']
    retTag.addListener(jmpToRet)
    vm.code.push(jmpToRet)

    vm.code.push(alterTag)
    loadValueWithTag(vm,node.alternate)

    return null
}

/**
 * 尝试在上下文中找到对应的变量,并加载到stack
 * @param {*} vm 
 * @param {*} name 
 * @returns 
 */
function searchVarInAll(vm,name){
    let idx = vm.findVar(name)
    
    if (idx[0] === -1) {
        idx=vm.findContextVar(name)
        if(idx[0]!=-1){
            vm.code.push([bydecodeDef.loadContextVal,idx])
            return null;
        }
        vm.logExtenals(name)
        vm.code.push([bydecodeDef.loadEnv, vm.addConstr(name)])
    } else {
        vm.code.push([bydecodeDef.loadVar, idx])
    }
    return idx;
}

function loadIdentifier(vm, node) {
    const name = node.name
    if(name=="null"){
        vm.code.push([bydecodeDef.loadNull])
        return ;
    }
    if(name=="undefined"){
        vm.code.push([bydecodeDef.loadUndefined])
        return ;
    }
  
    return searchVarInAll(vm,name);
}

function newExpression(vm, node) {
    const callee = node.callee
    const args = node.arguments
    for (let i = 0; args[i]; ++i) {
        loadValueWithTag(vm,args[i])
    }
    const name = callee.name
    let idx = vm.findVar(name)
    if (idx[0] === -1) {
        idx=vm.findContextVar(name)
        if(idx[0]!=-1){
            vm.code.push([bydecodeDef.newContextClassObject, idx, args.length])
            return null;
        }
        vm.logExtenals(name)
        vm.code.push([bydecodeDef.newClassObject, vm.addConstr(name), args.length])
    } else {
        vm.code.push([bydecodeDef.newLocalClassObject, idx, args.length])
    }

    return null
}

function callExpression(vm, node) {
    const callee = node.callee
    const args = node.arguments
    for (let i = 0; args[i]; ++i) {
        loadValueWithTag(vm,args[i])
    }
    if (callee.type === "Identifier") {
        const name = callee.name
        let idx = vm.findVar(name)
        if (idx[0] === -1) {
            idx=vm.findContextVar(name)
            if(idx[0]!=-1){
                vm.code.push([bydecodeDef.loadContextVal, idx])
                vm.code.push([bydecodeDef.callStackFunc, args.length])
                return null;
            }
            if(name==='exit'){
                vm.code.push([bydecodeDef.exit])
                return null;
            }
            vm.logExtenals(name)
            vm.code.push([bydecodeDef.callFunc, vm.addConstr(name), args.length])
        } else {
            vm.code.push([bydecodeDef.loadVar, idx])
            vm.code.push([bydecodeDef.callStackFunc, args.length])
        }
        return null
    } else if (callee.type === "MemberExpression") {
        loadCallExpressionMember(vm,callee,args,true)
        return null
    }else if(callee.type === 'FunctionExpression'){
        defFunction(vm,callee)
        vm.code.push([bydecodeDef.callStackFunc, args.length])
        return null
    }
    throw new Error("unknown callee type "+callee.type)
}


function loadCallExpressionMember(vm,node,args,isTop){
    if(node.type==="NewExpression"){
        newExpression(vm,node)
        return ;
    }else if(node.type==="CallExpression"){
        callExpression(vm,node)
        return;
    }else if(node.object.type==="Identifier"){
        if(isTop){
            const name = node.object.name
            let idx = vm.findVar(name)
            if (idx[0] === -1) {
                idx=vm.findContextVar(name)
                if(idx[0]!=-1){
                    vm.code.push([bydecodeDef.contextMemberMethod,idx, vm.addConstr(node.property.name), args.length])
                    return ;
                }
                vm.logExtenals(name)
                vm.code.push([bydecodeDef.envMemberMethod, vm.addConstr(name), vm.addConstr(node.property.name), args.length])
            } else {
                vm.code.push([bydecodeDef.memberMethod, idx, vm.addConstr(node.property.name), args.length])
            }
            return ;
        }else{
            loadIdentifier(vm,node.object)
        }
    }else{
        loadCallExpressionMember(vm,node.object,false)
    }
    if(node.object.type==="Identifier"){
        if(vm.sourceCode.charAt(node.property.start-1)==='['){
            loadValueWithTag(vm, node.property)
        }else{
            vm.code.push([bydecodeDef.loadConst,vm.addConstr(node.property.name)])
        }
    }else if(node.object.type==="Literal"){
        loadValueWithTag(vm, node.property)
    }else{
        vm.code.push([bydecodeDef.loadConst,vm.addConstr(node.property.name)])
    }
    
    
    if(isTop){
        vm.code.push([bydecodeDef.stackMemberMethod,args.length])
    }else{
        vm.code.push([bydecodeDef.loadProp])
    } 
}

function forStatement(vm, node) {
   
    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    const startPosition=checkCurrentIndex(vm)
    if (node.init) {
        if(node.init.type==="VariableDeclaration"){
            const es=node.init.declarations
            for(let k=0;es[k];++k){
                VariableDeclarator(vm,es[k])
            }
        }else{
            loadValueWithTag(vm,node.init)
            vm.code.push([bydecodeDef.popStack])
        }
    }
    const loop = new __Tag("forStatementStart")
    vm.code.push(loop)
    const end = new __Tag("forStatementEnd")
 
    loadValueWithTag(vm,node.test)

    const jmpToEnd = [bydecodeDef.jmpZero, 0, end, '//jump to forStatementEnd, refresh position after finish compile']
    vm.code.push(jmpToEnd)
    end.addListener(jmpToEnd)

    const blockGoToStartTag=new __Tag("blockToStart")

    loadBlockStatement(vm,node.body, blockGoToStartTag, end)
    vm.code.push(blockGoToStartTag)

    loadValueWithTag(vm, node.update)
    vm.code.push([bydecodeDef.popStack])

    jumpToTag(vm,loop)

    const endPosition=checkCurrentIndex(vm)
    vm.code.push(end)
    vm.qiutBlock()
    vm.code.push([bydecodeDef.delStack])

    loadErrorBlockClean(vm,startPosition,endPosition)

}

function ifStatement(vm, node, startTag, endTag) {
    const next = new __Tag("ifStatementNext")
    const end = new __Tag("ifStatementEnd")
    
    loadValueWithTag(vm,node.test)

    const jmpToEnd = [bydecodeDef.jmpZero, 0, next, '//jump to ifStatementEnd, refresh position after finish compile']
    next.addListener(jmpToEnd)
    vm.code.push(jmpToEnd)
    
    loadBlockStatement(vm, node.consequent,startTag, endTag)
    
    if(node.alternate){
        jumpToTag(vm,end)
        vm.code.push(next)
        if(node.alternate.type==="IfStatement"){
            ifStatement(vm,node.alternate,startTag, endTag)
        }else{
            loadBlockStatement(vm, node.alternate,startTag, endTag)
        }
        vm.code.push(end)
    }else{
        vm.code.push(next)
    }

}

function whileStatement(vm, node) {
    const start = new __Tag("whileStatementStart")
    const end = new __Tag("whileStatementEnd")
    
    vm.code.push(start)

    loadValueWithTag(vm,node.test)

    const jmpToEnd = [bydecodeDef.jmpZero, 0, end, '//jump to whileStatementEnd, refresh position after finish compile']
    end.addListener(jmpToEnd)
    vm.code.push(jmpToEnd)
    
    loadBlockStatement(vm, node.body, start, end)

    jumpToTag(vm,start)

    vm.code.push(end)
}

function checkCurrentIndex(vm){
    let cc=0;
    for (let i = 0;vm.code[i];++i) {
        const bc=vm.code[i]
        if(bc instanceof Array){
            cc++
        }
    }
    return cc;
}

function tryStatement(vm, node, startTag, endTag){

    const loop = new __Tag("tryStatementLoop")
    const clean = new __Tag("tryStatementclean")

    const pureLoop = new __Tag("tryStatementLoop")
    const pureClean = new __Tag("tryStatementclean")

    const end = new __Tag("tryStatementEnd")

    const loadFinal=function(){
        if(node.finalizer){
            const finalizer=node.finalizer
           
            vm.newBlock()
            vm.code.push([bydecodeDef.newStack])
            const finallyBlockStartPosition=checkCurrentIndex(vm)
            if(finalizer.body.type=="BlockStatement"){
                blockStatement(vm, finalizer.body,startTag? pureLoop:startTag,endTag?pureClean:endTag)
            }else{
                blockStatement(vm, finalizer,startTag? pureLoop:startTag,endTag?pureClean:endTag)
            }
            const finallyBlockEndPosition=checkCurrentIndex(vm)
            vm.code.push([bydecodeDef.delStack])
            vm.qiutBlock()

            loadErrorBlockClean(vm,finallyBlockStartPosition,finallyBlockEndPosition)
        }
    }
    //正常快递此处开始
    const tryBlockStartPosition=checkCurrentIndex(vm)
    //加载正常块
    vm.code.push([bydecodeDef.newStack])
    vm.newBlock()
    blockStatement(vm, node.block,startTag? loop:startTag,endTag?clean:endTag)
    vm.qiutBlock()
    vm.code.push([bydecodeDef.delStack])
    //正常快递此处结束
    const tryEndPosition=checkCurrentIndex(vm)
    const next=new __Tag("tryStatementNext")
    jumpToTag(vm,next)
    //异常处理流程
    vm.catch.push([tryBlockStartPosition,tryEndPosition,checkCurrentIndex(vm)])
    vm.code.push([bydecodeDef.delStack])//处理异常前需要先把正常代码块卸载
    if(node.handler){
        const handler=node.handler

        vm.newBlock()
        vm.code.push([bydecodeDef.newStack])

        const catchBlockStartPosition=checkCurrentIndex(vm)
        const errorName=handler.param.name
        const curStack = vm.vars[vm.vars.length - 1]
        let idx = curStack[errorName]
        if (!idx) {
            idx = vm.addVar(errorName)
        }
        vm.code.push([bydecodeDef.loadError])
        vm.code.push([bydecodeDef.storeVar,idx])

        if(handler.body.type=="BlockStatement"){
            blockStatement(vm, handler.body,startTag? loop:startTag,endTag?clean:endTag)
        }else{
            blockStatement(vm, handler,startTag? loop:startTag,endTag?clean:endTag)
        }
        const catchBlockEndPosition=checkCurrentIndex(vm)
        vm.code.push([bydecodeDef.delStack])
        vm.qiutBlock()

        jumpToTag(vm,next)
        
        vm.catch.push([catchBlockStartPosition,catchBlockEndPosition,checkCurrentIndex(vm)])
        vm.code.push([bydecodeDef.delStack])//处理异常前需要先把正常代码块卸载
    }
    loadFinal()
    vm.code.push([bydecodeDef.throwError])
    
    if(startTag||endTag){
        if(startTag){
            vm.code.push(loop)
            vm.code.push([bydecodeDef.delStack])//处理continue前需要先把正常代码块卸载
            loadFinal()
            jumpToTag(vm,startTag)
            vm.code.push(pureLoop)
            vm.code.push([bydecodeDef.delStack])//处理continue前需要先把正常代码块卸载
            jumpToTag(vm,startTag)
        }
        if(endTag){
            vm.code.push(clean)
            vm.code.push([bydecodeDef.delStack])//处理break前需要先把正常代码块卸载
            loadFinal()
            jumpToTag(vm,endTag)
            vm.code.push(pureClean)
            vm.code.push([bydecodeDef.delStack])//处理break前需要先把正常代码块卸载
            jumpToTag(vm,endTag)
        }
    }
    vm.code.push(next)
    loadFinal()
    vm.code.push(end)
}


function loadErrorBlockClean(vm,start,end){
    const jmp=new __Tag("normalJump")
    jumpToTag(vm,jmp)//这里只允许跳转进来，其他时候要跳过
    const throwPosition=checkCurrentIndex(vm)
    vm.code.push([bydecodeDef.delStack])//处理异常前需要先把正常代码块卸载
    vm.code.push([bydecodeDef.throwError])
    vm.catch.push([start,end,throwPosition])
    vm.code.push(jmp)
}

function switchStatement(vm, node) {
    
    loadValueWithTag(vm,node.discriminant)
    //重新排序下case，把default放到最后匹配
    const cases=node.cases
    const sortCaseArray=[]
    let defaultCase=null
    const caseTagArr=[]
    for(let i=0;cases[i];++i){
        if(cases[i].test){
            sortCaseArray.push(cases[i])
        }else{
            defaultCase=cases[i]
        }
    }
    if(defaultCase!=null){
        sortCaseArray.push(defaultCase)
    }

    for(let i=0;sortCaseArray[i];++i){
        caseTagArr[i]=new __Tag("switchStatementTag"+i)
    }

    for(let i=0;sortCaseArray[i];++i){
        if(sortCaseArray[i].test){
            vm.code.push([bydecodeDef.dupStack])
    
            loadValueWithTag(vm, sortCaseArray[i].test)

            const clearStack=new __Tag("clearStack")
            const nextJudge=new __Tag("nextJudge")

            const jmpToClear = [bydecodeDef.eqJmp, 0, clearStack, '//jump to switchStatementCaseTest, refresh position after finish compile']
            vm.code.push(jmpToClear)
            clearStack.addListener(jmpToClear)
            
            jumpToTag(vm,nextJudge)

            vm.code.push(clearStack)
            vm.code.push([bydecodeDef.popStack])
            jumpToTag(vm,caseTagArr[i])

            vm.code.push(nextJudge)
        }else{
            vm.code.push([bydecodeDef.popStack])
            jumpToTag(vm,caseTagArr[i])
        }
    }
  
    const clean = new __Tag("switchStatementCaseClean")

    const end=new __Tag("switchStatementTagEnd")
    for(let i=0;sortCaseArray[i];++i){
        vm.code.push(caseTagArr[i])
        const consequent=sortCaseArray[i].consequent
        for(let k=0;consequent[k];++k){
            if(consequent[k].type!=="BreakStatement"){
                const startPosition=checkCurrentIndex(vm)
                vm.newBlock()
                vm.code.push([bydecodeDef.newStack])
                blockStatement(vm,consequent[k],null,clean)
                vm.code.push([bydecodeDef.delStack])
                vm.qiutBlock()
                loadErrorBlockClean(vm,startPosition,checkCurrentIndex(vm))
            }else{
                jumpToTag(vm,end)
            } 
        }
    }
    jumpToTag(vm,end)
    vm.code.push(clean)
    vm.code.push([bydecodeDef.delStack])
    vm.code.push(end)
}



function doWhileStatement(vm, node) {
    const start = new __Tag("doWhileStatementStart")
    const loop = new __Tag("doWhileStatementLoop")
    const end = new __Tag("whileStatementEnd")
    
    vm.code.push(start)

    loadBlockStatement(vm, node.body, loop, end)

    vm.code.push(loop)
    loadValueWithTag(vm, node.test)

    const jmpToStart = [bydecodeDef.jmpNotZero, 0, start, '//jump to doWhileStatementStart, refresh position after finish compile']
    vm.code.push(jmpToStart)
    start.addListener(jmpToStart)

    vm.code.push(end)

}

function binaryExpression(vm, node) {
    if (node.left) {
        const leftTag=new __Tag("varLoadTag")
        loadDefVar(vm, node.left,leftTag)
        vm.code.push(leftTag)
    } else {
        vm.code.push([bydecodeDef.loadNull])
    }
    if (node.right) {
        const rightTag=new __Tag("varLoadTag")
        loadDefVar(vm, node.right,rightTag)
        vm.code.push(rightTag)
    } else {
        vm.code.push([bydecodeDef.loadNull])
    }
    switch (node.operator) {
        case '^': vm.code.push([bydecodeDef.nor]); break;
        case '+': vm.code.push([bydecodeDef.add]); break;
        case '-': vm.code.push([bydecodeDef.min]); break;
        case '*': vm.code.push([bydecodeDef.mul]); break;
        case '/': vm.code.push([bydecodeDef.div]); break;
        case '%': vm.code.push([bydecodeDef.mod]); break;
        case '&': vm.code.push([bydecodeDef.byteAnd]); break;
        case '|': vm.code.push([bydecodeDef.byteOr]); break;
        case '&&': vm.code.push([bydecodeDef.and]); break;
        case '||': vm.code.push([bydecodeDef.or]); break;
        case '<': vm.code.push([bydecodeDef.lt]); break;
        case '<=': vm.code.push([bydecodeDef.lte]); break;
        case '>': vm.code.push([bydecodeDef.gt]); break;
        case '>=': vm.code.push([bydecodeDef.gte]); break;
        case '==': vm.code.push([bydecodeDef.eq]); break;
        case '===': vm.code.push([bydecodeDef.eq]); break;
        case '>>': vm.code.push([bydecodeDef.byteMovRight]); break;
        case '>>>': vm.code.push([bydecodeDef.byteUnsignedMovRight]); break;
        case '<<': vm.code.push([bydecodeDef.byteMovLeft]); break;
        case "instanceof": vm.code.push([bydecodeDef.instanceof]); break;
        default: throw new Error("unkonow binaryExpression operator " + node.operator);
    }
    return null
}

function unaryExpression(vm,node){
   
    switch (node.operator) {
        case '!': {
            const argumentTag=new __Tag("argumentTag")
            loadDefVar(vm, node.argument,argumentTag)
            vm.code.push(argumentTag)
            vm.code.push([bydecodeDef.not]);
        } break;
        case '-': {
            vm.code.push([bydecodeDef.loadValue,0]);
            const argumentTag=new __Tag("argumentTag")
            loadDefVar(vm, node.argument,argumentTag)
            vm.code.push(argumentTag)
            vm.code.push([bydecodeDef.min]);
        } break;
        case '~': {
            const argumentTag=new __Tag("argumentTag")
            loadDefVar(vm, node.argument,argumentTag)
            vm.code.push(argumentTag)
            vm.code.push([bydecodeDef.reverse]);
        } break;
        case "typeof": {
            const argumentTag=new __Tag("argumentTag")
            loadDefVar(vm, node.argument,argumentTag)
            vm.code.push(argumentTag)
            vm.code.push([bydecodeDef.typeof]);
        } break;
        case "void": {
            const argumentTag=new __Tag("argumentTag")
            loadDefVar(vm, node.argument,argumentTag)
            vm.code.push(argumentTag)
            vm.code.push([bydecodeDef.void]);
        } break;
        default: throw new Error("unkonow unaryExpression operator " + node.operator);
    }
    return null
}

export default {
    accept
}