import bydecodeDef from './CodeDefine'
import Runtime from "./Runtime"

class __JSVM {
    constructor() {
         /** 字符串常亮库 */
        this.consts = []
        this.vars = []
        this.map = []
        this.code = []
        /** 需要外部引入的数据 */
        this.extenals=[]
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

__JSVM.prototype.compile = function () {
   const data=[]
   const codePositonTag=[]
   const codeMap=[]
   for(let i=0;this.code[i];++i){
       codeMap[i]=data.length
       const ins=this.code[i]
       data.push(ins[0].val)
       //记录跳转代码位置
       switch(ins[0].val){
            case bydecodeDef.jmp.val:
            case bydecodeDef.jmpNotZero.val:
            case bydecodeDef.jmpZero.val:
            case bydecodeDef.eqJmp.val:
            case bydecodeDef.neqJmp.val:{
                if(!codePositonTag[ins[1]]){
                    codePositonTag[ins[1]]=[]
                }
                codePositonTag[ins[1]].push(data.length)
            }break;     
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
   }
   //更新代码跳转位置
   for(let p in codePositonTag){
       const update=codePositonTag[p]
       update.forEach(v=>{
            data[v]=codeMap[p]
       })
   }
   const runtime=new Runtime()
   runtime.constants=this.consts
   runtime.code=data
   const codeMethod=[]
   for(let code in bydecodeDef){
       const ins=bydecodeDef[code]
       codeMethod[ins.val]=ins._apply
   }
   runtime.codeMap=codeMethod
   return runtime
}

function accept(node) {
    const vm = new __JSVM();
    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    blockStatement(vm, node)
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()

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
        const type = body[i].type
        switch (type) {
            case "ReturnStatement":returnStatement(vm,body[i]);break;
            case "ContinueStatement": jumpToTag(vm, blockStartTag); break;
            case "BreakStatement": jumpToTag(vm, blockStartTag); break;
            case "VariableDeclaration": {
                const vars = body[i].declarations
                for (let k = 0; vars[k]; ++k) {
                    VariableDeclarator(vm, vars[k])
                }
            } break;
            case "BlockStatement": {
                const blockStart = new __Tag("nestBlockStart")
                const blockEnd = new __Tag("nestBlockStart")
                vm.newBlock()
                vm.code.push([bydecodeDef.newStack])
                blockStatement(vm, body[i], blockStart, blockEnd)

                const nextCode = new __Tag("GoToNextCode")
                vm.code.push([bydecodeDef.delStack])
                const jumpNextCode = [bydecodeDef.jmp, 0, nextCode, '//jump to blockNextCode, refresh position after finish compile']
                nextCode.addListener(jumpNextCode)
                vm.code.push(jumpNextCode)

                vm.code.push(blockStart)
                vm.code.push([bydecodeDef.delStack])
                const jumpParentStart = [bydecodeDef.jmp, 0, blockStartTag, '//jump to parentStart, refresh position after finish compile']
                blockStartTag.addListener(jumpParentStart)
                vm.code.push(jumpParentStart)

                vm.code.push(blockEnd)
                vm.code.push([bydecodeDef.delStack])
                const jumpParentEnd = [bydecodeDef.jmp, 0, blockEndTag, '//jump to parentStart, refresh position after finish compile']
                blockEndTag.addListener(jumpParentEnd)
                vm.code.push(jumpParentEnd)

                vm.code.push(nextCode)
                vm.qiutBlock()
            } break;
            case "ExpressionStatement": {
                const expression = body[i].expression
                const tag=new __Tag("expressTag")
                loadDefVar(vm, expression,tag);
                vm.code.push(tag)
                vm.code.push([bydecodeDef.movRet])
            } break;
            case "ForStatement": {
                forStatement(vm, body[i])
            } break;
            case "IfStatement": {
                ifStatement(vm, body[i], blockStartTag, blockEndTag)
            } break;
            case "WhileStatement":{
                whileStatement(vm, body[i], blockStartTag, blockEndTag)
            }break;
            case "DoWhileStatement":{
                doWhileStatement(vm,body[i],blockStartTag,blockEndTag)
            }break;
            case "SwitchStatement" :{
                switchStatement(vm,body[i],blockStartTag,blockEndTag)
            }break;
            default: throw new Error("unknow statement "+body[i].type)
        }
    }
}

function returnStatement(vm,node){
    if(node.argument){
        const tag=new __Tag("retTag")
        loadDefVar(vm,node.argument,tag)
        vm.code.push(tag)
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
    const tag=new __Tag("initTag")
    loadDefVar(vm,node.init,tag)
    vm.code.push(tag)
    vm.code.push([bydecodeDef.storeVar, idx])
    return idx
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
            const psTag=new __Tag("psTag")
            loadDefVar(vm,ps[i].value,psTag)
            vm.code.push(psTag)
            vm.code.push([bydecodeDef.rsetProp])
        }
        return null
    } else if (type === "Literal") {
        const val = node.value
        if (typeof val === 'number') {
            vm.code.push([bydecodeDef.loadValue, val])
        } else if (typeof val === 'string') {
            vm.consts.push(val);
            vm.code.push([bydecodeDef.loadConst, vm.addConstr(val)])
        }
        return null
    } else if (type === "ArrayExpression") {
        const es = node.elements
        for (let i = 0; es[i]; ++i) {
            const esTag=new __Tag("esTag")
            loadDefVar(vm,es[i],esTag)
            vm.code.push(esTag)
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
        const idx = loadDefVar(vm, node.argument,updataTag)
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
                vm.code.push([bydecodeDef.storeEnv, vm.addConstr(node.argument.name)])
            }
        } else if (node.argument.type == "MemberExpression") {
            const ag = node.argument
            const objTag=new __Tag("objectTag")
            loadDefVar(vm, ag.object,objTag)
            vm.code.push(objTag)
            const propTag=new __Tag("propTag")
            loadDefVar(vm, ag.property,propTag)
            vm.code.push(propTag)
            vm.code.push([bydecodeDef.setProp])
        }

        return idx

    } else if (type === "MemberExpression") {
        if(node.object.type==="Identifier"&&node.property.type==="Identifier"){
            const name = node.object.name
            let idx = vm.findVar(name)
            if (idx[0] === -1) {
                vm.logExtenals(name)
                vm.code.push([bydecodeDef.loadEnv, vm.addConstr(name)])
            } else {
                vm.code.push([bydecodeDef.loadVar, idx])
            }
            vm.code.push([bydecodeDef.loadConst, vm.addConstr(node.property.name)])
        }else{
            const objTag=new __Tag("objectTag")
            loadDefVar(vm, node.object,objTag)
            vm.code.push(objTag)
            if(node.property.type==="Identifier"){
                vm.code.push([bydecodeDef.loadConst, vm.addConstr(node.property.name)])
            }else{
                const propTag=new __Tag("propTag")
                loadDefVar(vm, node.property,propTag)
                vm.code.push(propTag)
            }
        }

        vm.code.push([bydecodeDef.loadProp])
        return "cacl"
    }else if(type==="AssignmentExpression"){
        const rightTag=new __Tag("rightTag")
        loadDefVar(vm, node.right,rightTag)
        vm.code.push(rightTag)
        const left=node.left
        if (left.type == "Identifier") {
            const idx =  loadIdentifier(vm, left)
            if (idx && idx[0] != -1) {
                vm.code.push([bydecodeDef.storeVar, idx])
            }else{
                vm.code.push([bydecodeDef.storeEnv,vm.addConstr(node.property.name)])
            }
            return idx
        } else if (left.type == "MemberExpression") {
            loadAssignmentMember(vm,left,true)
            return null
        }
    }else if(type==="LogicalExpression"){
        const tagLeft=new __Tag("leftTag")
        loadDefVar(vm, node.left,tagLeft)
        vm.code.push(tagLeft)
        vm.code.push( [bydecodeDef.dupStack])
        if(node.operator==="||"){
            const jmpToNext = [bydecodeDef.jmpNotZero, 0, nextBlockTag, '//jump to logicalExpression, refresh position after finish compile']
            nextBlockTag.addListener(jmpToNext)
            vm.code.push(jmpToNext)
        }else if(node.operator==="&&"){
            const jmpToNext = [bydecodeDef.jmpZero, 0, nextBlockTag, '//jump to logicalExpression, refresh position after finish compile']
            nextBlockTag.addListener(jmpToNext)
            vm.code.push(jmpToNext)
        }
        vm.code.push( [bydecodeDef.popStack])
        const tagRight=new __Tag("tagRight")
        loadDefVar(vm, node.right,tagRight)
        vm.code.push(tagRight)
        return null
    }else if(type==="ConditionalExpression"){
        return conditionalExpression(vm,node,nextBlockTag)
    }
    throw new Error("unknown variable type " + type)
}


function loadAssignmentMember(vm,node,isTop){
   
    if(node.object.type==="Identifier"){
        const objTag=new __Tag("objectTag")
        loadIdentifier(vm, node.object,objTag)
        vm.code.push(objTag)
    }else{
        loadAssignmentMember(vm,node.object,false)
    }
    
    vm.code.push([bydecodeDef.loadConst,vm.addConstr(node.property.name)])
    if(isTop){
        vm.code.push([bydecodeDef.setProp])
    }else{
        vm.code.push([bydecodeDef.loadProp])
    } 
}

function conditionalExpression(vm,node,retTag){
    const test=new __Tag("testTag")
    loadDefVar(vm,node.test,test)
    vm.code.push(test)

    const alterTag=new __Tag("alterTag")
    const jmpToAlter = [bydecodeDef.jmpZero, 0, alterTag, '//jump to return, refresh position after finish compile']
    alterTag.addListener(jmpToAlter)
    vm.code.push(jmpToAlter)

    const valTag=new __Tag("valTag")
    loadDefVar(vm,node.consequent,valTag)
    vm.code.push(valTag)
    const jmpToRet = [bydecodeDef.jmp, 0, retTag, '//jump to return, refresh position after finish compile']
    retTag.addListener(jmpToRet)
    vm.code.push(jmpToRet)

    vm.code.push(alterTag)
    const lastTag=new __Tag("lastTag")
    loadDefVar(vm,node.alternate,lastTag)
    vm.code.push(lastTag)

    return null
}

function loadIdentifier(vm, node) {
    const name = node.name
    let idx = vm.findVar(name)
    if (idx[0] === -1) {
        vm.logExtenals(name)
        vm.code.push([bydecodeDef.loadEnv, vm.addConstr(name)])
    } else {
        vm.code.push([bydecodeDef.loadVar, idx])
    }
    return idx;
}

function newExpression(vm, node) {
    const callee = node.callee
    const args = node.arguments
    for (let i = 0; args[i]; ++i) {
        const tag=new __Tag("varLoadTag")
        loadDefVar(vm,args[i],tag)
        vm.code.push(tag)
    }
    const name = callee.name
    let idx = vm.findVar(name)
    if (idx[0] === -1) {
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
        const tag=new __Tag("varLoadTag")
        loadDefVar(vm,args[i],tag)
        vm.code.push(tag)
    }
    if (callee.type === "Identifier") {
        const name = callee.name
        let idx = vm.findVar(name)
        if (idx[0] === -1) {
            vm.logExtenals(name)
            vm.code.push([bydecodeDef.callFunc, vm.addConstr(name), args.length])
        } else {
            vm.code.push([bydecodeDef.callLocalFunc, idx, args.length])
        }
        return null
    } else if (callee.type === "MemberExpression") {
        loadCallExpressionMember(vm,callee,args,true)
        return null
    }
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
    vm.code.push([bydecodeDef.loadConst,vm.addConstr(node.property.name)])
    if(isTop){
        vm.code.push([bydecodeDef.stackMemberMethod,args.length])
    }else{
        vm.code.push([bydecodeDef.loadProp])
    } 
}

function forStatement(vm, node) {
    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    if (node.init) {
        if(node.init.type==="VariableDeclaration"){
            const es=node.init.declarations
            for(let k=0;es[k];++k){
                VariableDeclarator(vm,es[k])
            }
        }else{
            const tag=new __Tag("varLoadTag")
            loadDefVar(vm,node.init,tag)
            vm.code.push(tag)
        }
    }
    const loop = new __Tag("forStatementStart")
    const end = new __Tag("forStatementEnd")
    vm.code.push(loop)

    const testTag = new __Tag("forStatementTest")
    loadDefVar(vm, node.test,testTag)
    vm.code.push(testTag)
    const jmpToEnd = [bydecodeDef.jmpZero, 0, end, '//jump to forStatementEnd, refresh position after finish compile']
    vm.code.push(jmpToEnd)
    end.addListener(jmpToEnd)


    const blockGoToStartTag=new __Tag("blockToStart")
    const blockGoToEndTag=new __Tag("blockToStart")
    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    if(node.body.type=="BlockStatement"){
        blockStatement(vm, node.body, blockGoToStartTag, blockGoToEndTag)
    }else{
        blockStatement(vm, node, blockGoToStartTag, blockGoToEndTag)
    }

    vm.code.push(blockGoToStartTag)
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()

    const updateTag = new __Tag("forStatementUpdate")
    loadDefVar(vm, node.update,updateTag)
    vm.code.push(updateTag)
    vm.code.push([bydecodeDef.popStack])

    const jmpToOutLoop = [bydecodeDef.jmp, 0, loop, '//jump to forStatementStart, refresh position after finish compile']
    vm.code.push(jmpToOutLoop)
    loop.addListener(jmpToOutLoop)

    vm.code.push(blockGoToEndTag)
    vm.code.push([bydecodeDef.delStack])

    vm.code.push(end)
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()
}

function ifStatement(vm, node, startTag, endTag) {
    const end = new __Tag("ifStatementEnd")
    
    const test = new __Tag("ifStatementTest")
    loadDefVar(vm, node.test,test)
    vm.code.push(test)

    const jmpToEnd = [bydecodeDef.jmpZero, 0, end, '//jump to ifStatementEnd, refresh position after finish compile']
    end.addListener(jmpToEnd)
    vm.code.push(jmpToEnd)

    const ifNestStartTag=new __Tag("ifNestStartTag")
    const ifNestEndTag=new __Tag("ifNestEndTag")
    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    blockStatement(vm, node.consequent, ifNestStartTag, ifNestEndTag)
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()

    const goToEnd = [bydecodeDef.jmp, 0, end, '//jump to ifStatementEnd, refresh position after finish compile']
    end.addListener(goToEnd)
    vm.code.push(goToEnd)

    vm.code.push(ifNestStartTag)
    vm.code.push([bydecodeDef.delStack])
    const jmpToOutterStart = [bydecodeDef.jmp, 0, startTag, '//jump to ifStatementOutterStart, refresh position after finish compile']
    startTag.addListener(jmpToOutterStart)
    vm.code.push(jmpToOutterStart)

    vm.code.push(ifNestEndTag)
    vm.code.push([bydecodeDef.delStack])
    const jmpToOutterEnd = [bydecodeDef.jmp, 0, endTag, '//jump to ifStatementOutterEnd, refresh position after finish compile']
    endTag.addListener(jmpToOutterEnd)
    vm.code.push(jmpToOutterEnd)
    
    vm.code.push(end)
}

function whileStatement(vm, node) {
    const start = new __Tag("whileStatementStart")
    const loop = new __Tag("whileStatementLoop")
    const clean = new __Tag("whileStatementclean")
    const end = new __Tag("whileStatementEnd")
    
    vm.code.push(start)

    const test = new __Tag("whileStatementTest")
    loadDefVar(vm, node.test,test)
    vm.code.push(test)

    const jmpToEnd = [bydecodeDef.jmpZero, 0, end, '//jump to whileStatementEnd, refresh position after finish compile']
    end.addListener(jmpToEnd)
    vm.code.push(jmpToEnd)

    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    if(node.body.type=="BlockStatement"){
        blockStatement(vm, node.body, loop, clean)
    }else{
        blockStatement(vm, node, loop, clean)
    }
    vm.code.push(loop)
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()

    const jmpToStart = [bydecodeDef.jmp, 0, start, '//jump to whileStatementStart, refresh position after finish compile']
    vm.code.push(jmpToStart)
    start.addListener(jmpToStart)

    vm.code.push(clean)
    vm.code.push([bydecodeDef.delStack])
    vm.code.push(end)

}


function switchStatement(vm, node) {
    
    const discriminant = new __Tag("switchStatementdiscriminant")
    loadDefVar(vm, node.discriminant,discriminant)
    vm.code.push(discriminant)
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
    
            const test = new __Tag("switchStatementCaseTest")
            loadDefVar(vm, sortCaseArray[i].test,test)
            vm.code.push(test)

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
            const jmpToNext = [bydecodeDef.jmp, 0, caseTagArr[i], '//jump to switchStatementCaseTest, refresh position after finish compile']
            vm.code.push(jmpToNext)
            caseTagArr[i].addListener(jmpToNext)
        }
    }

  
    const clean = new __Tag("switchStatementCaseClean")

    const end=new __Tag("switchStatementTagEnd")
    for(let i=0;sortCaseArray[i];++i){
        vm.code.push(caseTagArr[i])
        const consequent=sortCaseArray[i].consequent
        for(let k=0;consequent[k];++k){
            if(consequent[k].type!=="BreakStatement"){
                vm.newBlock()
                vm.code.push([bydecodeDef.newStack])
                blockStatement(vm,consequent[k],null,clean)
                vm.code.push([bydecodeDef.delStack])
                vm.qiutBlock()
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
    const clean = new __Tag("whileStatementClean")
    
    vm.code.push(start)

    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    if(node.body.type=="BlockStatement"){
        blockStatement(vm, node.body, loop, clean)
    }else{
        blockStatement(vm, node, loop, clean)
    }

    vm.code.push(loop)
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()

    const test = new __Tag("doWhileStatementTest")
    loadDefVar(vm, node.test,test)
    vm.code.push(test)

    const jmpToStart = [bydecodeDef.jmpNotZero, 0, start, '//jump to doWhileStatementStart, refresh position after finish compile']
    vm.code.push(jmpToStart)
    start.addListener(jmpToStart)

    const end = new __Tag("whileStatementEnd")
    const jmpToEnd = [bydecodeDef.jmp, 0,  end, '//jump to doWhileStatementEnd, refresh position after finish compile']
    vm.code.push(jmpToEnd)
    end.addListener(jmpToEnd)

    vm.code.push(clean)
    vm.code.push([bydecodeDef.delStack])
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
        default: throw new Error("unkonow unaryExpression operator " + node.operator);
    }
    return null
}

export default {
    accept
}