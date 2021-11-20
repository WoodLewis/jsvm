const bydecodeDef = {
    add: {
        des: {
            code: "add",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'add',
        val: 1
    },
    min: {
        des: {
            code: "min",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'min',
        val: 2
    },
    mul: {
        des: {
            code: "mul",
            stack: "[arg1,arg2]",
        },
        name: 'mul',
        val: 3
    },
    div: {
        des: {
            code: "div",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'div',
        val: 4
    },
    mod: {
        des: {
            code: "mod",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'mod',
        val: 5
    },
    eqJmp: {
        des: {
            code: "eqJmp codeIndex",
            stack: "[arg1,arg2]",
            newStack: "[]"
        },
        name: 'eqJmp',
        val: 6
    },
    neqJmp: {
        des: {
            code: "neqJmp codeIndex",
            stack: "[arg1,arg2]",
            newStack: "[]"
        },
        name: 'neqJmp',
        val: 7
    },
    loadConst: {
        des: {
            code: "newClassObject stringValueIndex",
            stack: "[]",
            newStack: "[stringVal]"
        },
        name: 'loadConst',
        val: 8
    },
    mkArr: {
        des: {
            code: "mkArr argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[[arg1,arg2,arg3...]]"
        },
        name: 'makeArray',
        val: 9
    },
    loadVar: {
        des: {
            code: "loadVar tagetObjectStackPosition[stackIndex,positionIndex]",
            stack: "[]",
            newStack: "[varVal]"
        },
        name: 'loadVar',
        val: 10
    },
    loadValue: {
        des: {
            code: "loadValue val",
            stack: "[]",
            newStack: "[val]"
        },
        name: 'loadValue',
        val: 11
    },
    newStack: {
        des: {
            code: "newStack",
            stack: "[]",
            newStack: "[][]"
        },
        name: 'newStack',
        val: 12
    },
    storeVar: {
        des: {
            code: "storeVar tagetObjectStackPosition[stackIndex,positionIndex]",
            stack: "[arg]",
            newStack: "[]"
        },
        name: 'storeVar',
        val: 13
    },
    newClassObject: {
        des: {
            code: "newClassObject classNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'newClassObject',
        val: 14
    },
    callFunc: {
        des: {
            code: "callFunc functionNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'callFunc',
        val: 15
    },
    memberMethod: {
        des: {
            code: "memberMethod tagetObjectStackPosition[stackIndex,positionIndex] functionNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'memberMethod',
        val: 16
    },
    popStack: {
        des: {
            code: "and",
            stack: "[objToPop]",
            newStack: "[]"
        },
        name: 'popStack',
        val: 17
    },
    and: {
        des: {
            code: "and",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'and',
        val: 18
    },
    or: {
        des: {
            code: "or",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'or',
        val: 19
    },
    byteAnd: {
        des: {
            code: "byteAnd",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'byteAnd',
        val: 20
    },
    byteOr: {
        des: {
            code: "byteOr",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'byteOr',
        val: 21
    },
    loadNull: {
        des: {
            code: "loadNull",
            stack: "[]",
            newStack: "[null]"
        },
        name: 'loadNull',
        val: 22
    },
    envMemberMethod: {
        des: {
            code: "envMemberMethod tagertObjectNameIndex targetFunctionNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'envMemberMethod',
        val: 23
    },
    loadEnv: {
        des: {
            code: "loadEnv tagertObjectNameIndex",
            stack: "[]",
            newStack: "[targetObject]"
        },
        name: 'loadEnv',
        val: 24
    },
    jmpZero: {
        des: {
            code: "jmpZero codeIndex",
            stack: "[testVal]",
            newStack: "[]"
        },
        name: 'jmpZero',
        val: 24
    },
    jmpNotZero: {
        des: {
            code: "jmpNotZero codeIndex",
            stack: "[testVal]",
            newStack: "[]"
        },
        name: 'jmpNotZero',
        val: 24
    },
    delStack: {
        des: {
            code: "delStack",
            stack: "[][]",
            newStack: "[]"
        },
        name: 'delStack',
        val: 25
    },
    noop: {
        des: {
            code: "noop",
            stack: "[]",
            newStack: "[]"
        },
        name: 'noop',
        val: 26
    },
    lt: {
        des: {
            code: "lt",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'lt',
        val: 27
    },
    gt: {
        des: {
            code: "gt",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'gt',
        val: 28
    },
    lte: {
        des: {
            code: "lte",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'lte',
        val: 28
    },
    gte: {
        des: {
            code: "gte",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'gte',
        val: 28
    },
    inc: {
        des: {
            code: "inc",
            stack: "[var1]",
            newStack: "[var1+1]"
        },
        name: 'inc',
        val: 29
    },
    dec: {
        des: {
            code: "dec",
            stack: "[var1]",
            newStack: "[var1-1]"
        },
        name: 'dec',
        val: 30
    },
    dupStack: {
        des: {
            code: "dupStack",
            stack: "[var1]",
            newStack: "[var1,var1]"
        },
        name: 'dupStack',
        val: 31
    },
    eq: {
        des: {
            code: "eq",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'eq',
        val: 32
    },
    jmp: {
        des: {
            code: "jmp codeIndex",
            stack: "[]",
            newStack: "[]"
        },
        name: 'jmp',
        val: 33
    },
    loadProp: {
        des: {
            code: "loadProp",
            stack: "[target,property]",
            newStack: "[val]"
        },
        name: 'loadProp',
        val: 34
    },
    setProp: {
        des: {
            code: "setProp",
            stack: "[val,target,property]",
            newStack: "[]"
        },
        name: 'setProp',
        val: 35
    },
    movToTmp: {
        des: {
            code: "movToTmp tempValudeIndex",
            stack: "[target]",
            newStack: "[]",
            tmp: "temp[tempValudeIndex]=target"
        },
        name: 'movToTmp',
        val: 36
    },
    movFromTmp: {
        des: {
            code: "movFromTmp tempValudeIndex",
            stack: "[]",
            newStack: "[target]",
            tmp: "temp[tempValudeIndex]=null"
        },
        name: 'movFromTmp',
        val: 37
    },
    retFunc: {
        des: {
            code: "retFunc",
            stack: "[retVal]",
            newStack: "[]",
            retStack:"retVal"
        },
        name: 'retFunc',
        val: 38
    },
    newObj: {
        des: {
            code: "newObj",
            stack: "[]",
            newStack: "[obj]"
        },
        name: 'newObj',
        val: 39
    },
    rsetProp: {
        des: {
            code: "rsetProp",
            stack: "[target,property,val]",
            newStack: "[]"
        },
        name: 'rsetProp',
        val: 40
    },
    movRet: {
        des: {
            code: "movRet",
            stack: "[target]",
            newStack: "[]",
            retStack:"target"
        },
        name: 'movRet',
        val: 41
    },
}

class __JSVM {
    constructor() {
        this.ctx = []
        this.consts = []
        this.vars = []
        this.map = []
        this.code = []
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
   
    return -1
}

function accept(node) {
    const vm = new __JSVM();
    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    blockStatement(vm, node)
    // vm.code.push([bydecodeDef.delStack])
    // vm.qiutBlock()

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
    const body = node.body
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
                loadDefVar(vm, expression);
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
            default: throw new Error("unknow statement "+body[i].type)
        }
    }
}

function returnStatement(vm,node){
    if(node.argument){
        loadDefVar(vm,node.argument)
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
    loadDefVar(vm,node.init)
    vm.code.push([bydecodeDef.storeVar, idx])
    return idx
}

function loadDefVar(vm, node) {
    const type = node.type
    if (type === "VariableDeclarator") {
        return VariableDeclarator(vm, node)
    }else if(type==="ObjectExpression"){
        vm.code.push([bydecodeDef.newObj])
        const ps=node.properties
        for(let i=0;ps[i];++i){
            vm.code.push([bydecodeDef.dupStack])
            // loadDefVar(vm,ps[i].key)
            vm.code.push([bydecodeDef.loadConst, vm.addConstr(ps[i].key.name)])
            loadDefVar(vm,ps[i].value)
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
            loadDefVar(vm,es[i])
        }
        vm.code.push([bydecodeDef.mkArr, es.length])
        return null
    } else if (type === "NewExpression") {
        return newExpression(vm, node)
    } else if (type === "CallExpression") {
        return callExpression(vm, node)
    } else if (type === "BinaryExpression") {
        return binaryExpression(vm, node)
    } else if (type === "Identifier") {
        return loadIdentifier(vm, node)
    } else if (type == "SequenceExpression") {
        const es = node.expressions
        let lastIdx = null
        for (let i = 0; es[i]; ++i) {
            if (i > 0) {
                vm.code.push([bydecodeDef.popStack])
            }
            lastIdx = loadDefVar(vm,es[i])
        }
        return lastIdx
    } else if (type == "UpdateExpression") {
        const idx = loadDefVar(vm, node.argument)
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
                vm.code.push([bydecodeDef.popStack])
            }
        } else if (node.argument.type == "MemberExpression") {
            const ag = node.argument
            loadDefVar(vm, ag.object)
            loadDefVar(vm, ag.property)
            vm.code.push([bydecodeDef.setProp])
        }

        return idx

    } else if (type === "MemberExpression") {
        loadDefVar(vm, node.object)
        loadDefVar(vm, node.property)
        vm.code.push([bydecodeDef.loadProp])
        return "cacl"
    }else if(type==="AssignmentExpression"){
        loadDefVar(vm, node.right)
        const left=node.left
        if (left.type == "Identifier") {
            const idx =  loadIdentifier(vm, left)
            if (idx && idx[0] != -1) {
                vm.code.push([bydecodeDef.storeVar, idx])
            }else{
                vm.code.push([bydecodeDef.popStack])
            }
            return idx
        } else if (left.type == "MemberExpression") {
            loadDefVar(vm, left.object)
            loadDefVar(vm, left.property)
            vm.code.push([bydecodeDef.setProp])
            return null
        }
    }
    throw new Error("unknown variable type " + type)
}

function loadIdentifier(vm, node) {
    const name = node.name
    let idx = vm.findVar(name)
    if (idx[0] === -1) {
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
        loadDefVar(vm,args[i])
    }
    vm.code.push([bydecodeDef.newClassObject, vm.addConstr(callee.name), args.length])
    return null
}

function callExpression(vm, node) {
    const callee = node.callee
    const args = node.arguments
    for (let i = 0; args[i]; ++i) {
        loadDefVar(vm,args[i])
    }
    if (callee.type === "Identifier") {
        vm.code.push([bydecodeDef.callFunc, vm.addConstr(callee.name), args.length])
        return null
    } else if (callee.type === "MemberExpression") {
        const name = callee.object.name
        let idx = vm.findVar(name)
        if (idx[0] === -1) {
            vm.code.push([bydecodeDef.envMemberMethod, vm.addConstr(name), vm.addConstr(callee.property.name), args.length])
        } else {
            vm.code.push([bydecodeDef.memberMethod, idx, vm.addConstr(callee.property.name), args.length])
        }
        return null
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
        }
    }
    const loop = new __Tag("forStatementStart")
    const end = new __Tag("forStatementEnd")
    vm.code.push(loop)

    loadDefVar(vm, node.test)
    const jmpToEnd = [bydecodeDef.jmpZero, 0, end, '//jump to forStatementEnd, refresh position after finish compile']
    vm.code.push(jmpToEnd)
    end.addListener(jmpToEnd)

    if(node.body.type=="BlockStatement"){
        blockStatement(vm, node.body, loop, end)
    }else{
        blockStatement(vm, node, loop, end)
    }

    loadDefVar(vm, node.update)
    vm.code.push([bydecodeDef.popStack])

    const jmpToStart = [bydecodeDef.jmp, 0, loop, '//jump to forStatementStart, refresh position after finish compile']
    vm.code.push(jmpToStart)
    loop.addListener(jmpToStart)

    vm.code.push(end)
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()
}

function ifStatement(vm, node, startTag, endTag) {
    const end = new __Tag("ifStatementEnd")

    loadDefVar(vm, node.test)
    const jmpToEnd = [bydecodeDef.jmpZero, 0, end, '//jump to ifStatementEnd, refresh position after finish compile']
    end.addListener(jmpToEnd)
    vm.code.push(jmpToEnd)

    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    blockStatement(vm, node.consequent, startTag, endTag)
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()
    
    vm.code.push(end)
}

function whileStatement(vm, node) {
    const loop = new __Tag("whileStatementStart")
    vm.code.push(loop)
    loadDefVar(vm, node.test)

    const end = new __Tag("whileStatementEnd")
    const jmpToEnd = [bydecodeDef.jmpZero, 0, end, '//jump to whileStatementEnd, refresh position after finish compile']
    end.addListener(jmpToEnd)
    vm.newBlock()
    vm.code.push([bydecodeDef.newStack])
    if(node.body.type=="BlockStatement"){
        blockStatement(vm, node.body, loop, end)
    }else{
        blockStatement(vm, node, loop, end)
    }
    
    vm.code.push([bydecodeDef.delStack])
    vm.qiutBlock()

    const jmpToStart = [bydecodeDef.jmp, 0, loop, '//jump to whileStatementStart, refresh position after finish compile']
    vm.code.push(jmpToStart)
    loop.addListener(jmpToStart)

    vm.code.push(end)
}


function binaryExpression(vm, node) {
    if (node.left) {
        loadDefVar(vm, node.left)
    } else {
        vm.code.push([bydecodeDef.loadNull])
    }
    if (node.right) {
        loadDefVar(vm, node.right)
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
        default: throw new Error("unkonow operator " + node.operator);
    }
    return null
}

export default {
    accept
}