let byteCode_define_index=0

export default {
    exit: {
        des: {
            code: "exit",
            stack: "[...]...",
            newStack: "[]"
        },
        name: 'exit',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.exit()
            runtime.next(1)
        }
    },
    eqJmp: {
        des: {
            code: "eqJmp codeIndex",
            stack: "[arg1,arg2]",
            newStack: "[]"
        },
        name: 'eqJmp',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            if(left===right){
                runtime.jmp()
            }else{
                runtime.next(2)
            }
        }
    },
    neqJmp: {
        des: {
            code: "neqJmp codeIndex",
            stack: "[arg1,arg2]",
            newStack: "[]"
        },
        name: 'neqJmp',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            if(left===right){
                runtime.next(2)
            }else{
                runtime.jmp()
            }
        }
    },
    loadConst: {
        des: {
            code: "loadConst stringValueIndex",
            stack: "[]",
            newStack: "[stringVal]"
        },
        name: 'loadConst',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const index=runtime.nextCodeVal()
            const str=runtime.loadConstant(index)
            runtime.pushStack(str)
            runtime.next(2)
        }
    },
    loadBlank: {
        des: {
            code: "loadBlank",
            stack: "[]",
            newStack: "['']"
        },
        name: 'loadBlank',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack("")
            runtime.next(1)
        }
    },
    add: {
        des: {
            code: "add",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'add',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            runtime.pushStack(left+right)
            runtime.next(1)
        }
    },
    mkArr: {
        des: {
            code: "mkArr argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[[arg1,arg2,arg3...]]"
        },
        name: 'makeArray',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const len=runtime.nextCodeVal()
            const array=runtime.popStackTopN(len)
            runtime.pushStack(array)
            runtime.next(2)
        }
    },
    loadVar: {
        des: {
            code: "loadVar tagetObjectStackPosition[stackIndex,positionIndex]",
            stack: "[]",
            newStack: "[varVal]"
        },
        name: 'loadVar',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.visitStackVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2))
            runtime.pushStack(val)
            runtime.next(3)
        }
    },
    loadValue: {
        des: {
            code: "loadValue val",
            stack: "[]",
            newStack: "[val]"
        },
        name: 'loadValue',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.nextCodeVal()
            runtime.pushStack(val)
            runtime.next(2)
        }
    },
    loadThis:{
        des: {
            code: "loadThis",
            stack: "[]",
            newStack: "[this]"
        },
        name: 'loadThis',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(runtime.loadThis())
            runtime.next(1)
        }
    },
    newStack: {
        des: {
            code: "newStack",
            stack: "[]",
            newStack: "[][]"
        },
        name: 'newStack',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.newStack()
            runtime.next(1)
        }
    },
    storeVar: {
        des: {
            code: "storeVar tagetObjectStackPosition[stackIndex,positionIndex]",
            stack: "[arg]",
            newStack: "[]"
        },
        name: 'storeVar',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.popStackTop()
            runtime.storeStackValue(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2),val)
            runtime.next(3)
        }
    },
    movToStash: {
        des: {
            code: "movToStash",
            stack: "[arg]",
            newStack: "[]"
        },
        name: 'movToStash',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.movToStash()
            runtime.next(1)
        }
    },
    movfromStash: {
        des: {
            code: "movfromStash",
            stack: "[]",
            newStack: "[arg]"
        },
        name: 'movfromStash',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.movfromStash()
            runtime.next(1)
        }
    },
    min: {
        des: {
            code: "min",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'min',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            runtime.pushStack(left-right)
            runtime.next(1)
        }
    },
    initVarIfNeed: {
        des: {
            code: "initVarIfNeed tagetObjectStackPosition[stackIndex,positionIndex]",
            stack: "[arg]",
            newStack: "[]"
        },
        name: 'initVarIfNeed',
        val: byteCode_define_index++,
        _apply:function(runtime){
            if(runtime.visitStackVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2))===undefined){
                runtime.storeStackValue(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2),undefined)
            }
            
            runtime.next(3)
        }
    },
    load2NumAsArray: {
        des: {
            code: "load2NumAsArray n1 n2",
            stack: "[]",
            newStack: "[[n1,b2]]"
        },
        name: 'load2NumAsArray',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack([runtime.nextCodeNVal(1),runtime.nextCodeNVal(2)])
            runtime.next(3)
        }
    },
    mul: {
        des: {
            code: "mul",
            stack: "[arg1,arg2]",
        },
        name: 'mul',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            runtime.pushStack(left*right)
            runtime.next(1)
        }
    },
    div: {
        des: {
            code: "div",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'div',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            runtime.pushStack(left/right)
            runtime.next(1)
        }
    },
    storeContextVar: {
        des: {
            code: "storeContextVar tagetObjectStackPosition[stackIndex,positionIndex]",
            stack: "[arg]",
            newStack: "[]"
        },
        name: 'storeContextVar',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.popStackTop()
            runtime.storeContextVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2),val)
            runtime.next(3)
        }
    },
    storeContextVarSelective: {
        des: {
            code: "storeContextVarSelective tagertObjectNameIndex",
            stack: "[arg,arr]",
            newStack: "[]"
        },
        name: 'storeContextVarSelective',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const selective=runtime.popStackTop(),val=runtime.popStackTop()
            runtime.storeContextVarSelective(selective,val)?1:(runtime.pushBackEnv(runtime.loadConstant(runtime.nextCodeVal()),val))
            runtime.next(2)
        }
    },
    mod: {
        des: {
            code: "mod",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'mod',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            runtime.pushStack(left%right)
            runtime.next(1)
        }
    },
    newClassObject: {
        des: {
            code: "newClassObject classNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'newClassObject',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const className=runtime.loadConstant(runtime.nextCodeVal()),
                array=runtime.popStackTopN(runtime.nextCodeNVal(2))
            // const target=Object.create(classObj.prototype)
            // classObj.apply(target,array)
            runtime.pushStack(Reflect.construct(runtime.envObject(className),array))
            runtime.next(3)
            // runtime.pushStack(new (runtime.envObject(className))(...array))
        }
    },
    callFunc: {
        des: {
            code: "callFunc functionNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'callFunc',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const className=runtime.loadConstant(runtime.nextCodeVal())
            const array=runtime.popStackTopN(runtime.nextCodeNVal(2))
            
            runtime.pushStack(runtime.envObject(className).apply(window,array))
            runtime.next(3)
        }
    },
    memberMethod: {
        des: {
            code: "memberMethod tagetObjectStackPosition[stackIndex,positionIndex] functionNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'memberMethod',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.visitStackVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2))
            const index=runtime.nextCodeNVal(3), 
                methodName=runtime.loadConstant(index),
                args=runtime.nextCodeNVal(4)
            const array=runtime.popStackTopN(args)

            runtime.pushStack(val[methodName].apply(val,array))
            runtime.next(5)
        }
    },
    memberIndexMethod: {
        des: {
            code: "memberIndexMethod tagetObjectStackPosition[stackIndex,positionIndex] argsLenth",
            stack: "[arg1,arg2,arg3...,functionTarget]",
            newStack: "[retVal]"
        },
        name: 'memberIndexMethod',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.visitStackVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2))
            const args=runtime.nextCodeNVal(3)
            const methodName=runtime.popStackTop()
            const array=runtime.popStackTopN(args)

            runtime.pushStack(val[methodName].apply(val,array))
            runtime.next(4)
        }
    },
    contextMemberMethod: {
        des: {
            code: "contextMemberMethod tagetObjectStackPosition[stackIndex,positionIndex] functionNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'contextMemberMethod',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.visitContextVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2))
            const index=runtime.nextCodeNVal(3), 
                methodName=runtime.loadConstant(index),
                args=runtime.nextCodeNVal(4)
            const array=runtime.popStackTopN(args)

            runtime.pushStack(val[methodName].apply(val,array))
            runtime.next(5)
        }
    },
    contextMemberMethodSelective: {
        des: {
            code: "contextMemberMethodSelective functionNameIndex argsLenth nameIdex",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'contextMemberMethodSelective',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const methodName=runtime.loadConstant(runtime.nextCodeNVal(1)),
            args=runtime.nextCodeNVal(2),
            alterName=runtime.loadConstant(runtime.nextCodeNVal(3)),
            selective=runtime.popStackTop()

            const _v=runtime.visitContextValSelective(selective)
        
            const array=runtime.popStackTopN(args),target=_v[0]?_v[1]:runtime.envObject(alterName)

            runtime.pushStack(target[methodName].apply(target,array))
            runtime.next(4)
        }
    },
    contextMemberIndexMethod: {
        des: {
            code: "contextMemberMethod tagetObjectStackPosition[stackIndex,positionIndex] argsLenth",
            stack: "[arg1,arg2,arg3...,functionTarget]",
            newStack: "[retVal]"
        },
        name: 'contextMemberMethod',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.visitContextVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2))
            const args=runtime.nextCodeNVal(3)
            const methodName=runtime.popStackTop()
            const array=runtime.popStackTopN(args)

            runtime.pushStack(val[methodName].apply(val,array))
            runtime.next(4)
        }
    },
    contextMemberIndexMethodSelective: {
        des: {
            code: "contextMemberMethod  argsLenth nameIndex",
            stack: "[arg1,arg2,arg3...,functionTarget]",
            newStack: "[retVal]"
        },
        name: 'contextMemberMethod',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const args=runtime.nextCodeNVal(1),
                alterName=runtime.loadConstant(runtime.nextCodeNVal(2)),
                methodName=runtime.popStackTop(),
                selective=runtime.popStackTop()

            const _v=runtime.visitContextValSelective(selective)
           
            const array=runtime.popStackTopN(args),target=_v[0]?_v[1]:runtime.envObject(alterName)

            runtime.pushStack(target[methodName].apply(target,array))
            runtime.next(3)
        }
    },

    noopN: {
        des: {
            code: "noopN n",
            stack: "[]",
            newStack: "[]"
        },
        name: 'popStack',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.next(runtime.nextCodeVal()+2)
        }
    },
    and: {
        des: {
            code: "and",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'and',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(runtime.popStackTop()&&runtime.popStackTop())
            runtime.next(1)
        }
    },
    or: {
        des: {
            code: "or",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'or',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            runtime.pushStack(left||right)
            runtime.next(1)
        }
    },
    byteAnd: {
        des: {
            code: "byteAnd",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'byteAnd',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop(),
                left=runtime.popStackTop()
            runtime.pushStack(left&right)
            runtime.next(1)
        }
    },
    byteOr: {
        des: {
            code: "byteOr",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'byteOr',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop(),
                left=runtime.popStackTop()
            runtime.pushStack(left|right)
            runtime.next(1)
        }
    },
    loadNull: {
        des: {
            code: "loadNull",
            stack: "[]",
            newStack: "[null]"
        },
        name: 'loadNull',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(null)
            runtime.next(1)
        }
    },
    loadTrue: {
        des: {
            code: "loadTrue",
            stack: "[]",
            newStack: "[true]"
        },
        name: 'loadTrue',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(true)
            runtime.next(1)
        }
    },
    loadFalse: {
        des: {
            code: "loadFalse",
            stack: "[]",
            newStack: "[false]"
        },
        name: 'loadFalse',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(false)
            runtime.next(1)
        }
    },
    loadUndefined: {
        des: {
            code: "loadUndefined",
            stack: "[]",
            newStack: "[undefined]"
        },
        name: 'loadUndefined',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(undefined)
            runtime.next(1)
        }
    },
    loadWindow: {
        des: {
            code: "loadWindow",
            stack: "[]",
            newStack: "[window]"
        },
        name: 'loadWindow',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(window)
            runtime.next(1)
        }
    },
    envMemberMethod: {
        des: {
            code: "envMemberMethod tagertObjectNameIndex targetFunctionNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'envMemberMethod',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const objName=runtime.loadConstant(runtime.nextCodeVal()),
             methodName=runtime.loadConstant(runtime.nextCodeNVal(2)),
             args=runtime.nextCodeNVal(3),
             array=runtime.popStackTopN(args),
             target=runtime.envObject(objName)
            runtime.pushStack(target[methodName].apply(target,array))
            runtime.next(4)
        }
    },

    envMemberIndexMethod: {
        des: {
            code: "envMemberMethod tagertObjectNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...,method]",
            newStack: "[retVal]"
        },
        name: 'envMemberMethod',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const objName=runtime.loadConstant(runtime.nextCodeVal()),
             methodName=runtime.popStackTop(),
             args=runtime.nextCodeNVal(2),
             array=runtime.popStackTopN(args),
             target=runtime.envObject(objName)
            runtime.pushStack(target[methodName].apply(target,array))
            runtime.next(3)
        }
    },
    loadEnv: {
        des: {
            code: "loadEnv tagertObjectNameIndex",
            stack: "[]",
            newStack: "[targetObject]"
        },
        name: 'loadEnv',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const objName=runtime.loadConstant(runtime.nextCodeVal())
            runtime.pushStack(runtime.envObject(objName))
            runtime.next(2)
        }
    },
    jmpZero: {
        des: {
            code: "jmpZero codeIndex",
            stack: "[testVal]",
            newStack: "[]"
        },
        name: 'jmpZero',
        val: byteCode_define_index++,
        _apply:function(runtime){
            if(!runtime.popStackTop()){
                runtime.jmp()
            }else{
                runtime.next(2)
            }
        }
    },
    jmpNotZero: {
        des: {
            code: "jmpNotZero codeIndex",
            stack: "[testVal]",
            newStack: "[]"
        },
        name: 'jmpNotZero',
        val: byteCode_define_index++,
        _apply:function(runtime){
            if(runtime.popStackTop()){
                runtime.jmp()
            }else{
                runtime.next(2)
            }
        }
    },
    delStack: {
        des: {
            code: "delStack",
            stack: "[][]",
            newStack: "[]"
        },
        name: 'delStack',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.delStack()
            runtime.next(1)
        }
    },
    noop: {
        des: {
            code: "noop",
            stack: "[]",
            newStack: "[]"
        },
        name: 'noop',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.next(1)
        }
    },
    lt: {
        des: {
            code: "lt",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'lt',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop(),
                left=runtime.popStackTop()
            runtime.pushStack(left<right)
            runtime.next(1)
        }
    },
    gt: {
        des: {
            code: "gt",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'gt',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop(),
                left=runtime.popStackTop()
            runtime.pushStack(left>right)
            runtime.next(1)
        }
    },
    lte: {
        des: {
            code: "lte",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'lte',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop(),
                left=runtime.popStackTop()
            runtime.pushStack(left<=right)
            runtime.next(1)
        }
    },
    gte: {
        des: {
            code: "gte",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'gte',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop(),
                left=runtime.popStackTop()
            runtime.pushStack(left>=right)
            runtime.next(1)
        }
    },
    inc: {
        des: {
            code: "inc",
            stack: "[var1]",
            newStack: "[var1+1]"
        },
        name: 'inc',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(runtime.popStackTop()+1)
            runtime.next(1)
        }
    },
    dec: {
        des: {
            code: "dec",
            stack: "[var1]",
            newStack: "[var1-1]"
        },
        name: 'dec',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(runtime.popStackTop()-1)
            runtime.next(1)
        }
    },
    dupStack: {
        des: {
            code: "dupStack",
            stack: "[var1]",
            newStack: "[var1,var1]"
        },
        name: 'dupStack',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.dupStackTop()
            runtime.next(1)
        }
    },
    eq: {
        des: {
            code: "eq",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'eq',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(runtime.popStackTop()===runtime.popStackTop())
            runtime.next(1)
        }
    },
    neq: {
        des: {
            code: "eq",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'eq',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(runtime.popStackTop()!==runtime.popStackTop())
            runtime.next(1)
        }
    },
    instanceof: {
        des: {
            code: "instanceof",
            stack: "[var1,var2]",
            newStack: "[testResult]"
        },
        name: 'instanceof',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop(),
                left=runtime.popStackTop()
            runtime.pushStack(left&&right&&(left.__proto__==right.prototype))
            runtime.next(1)
        }
    },
    jmp: {
        des: {
            code: "jmp codeIndex",
            stack: "[]",
            newStack: "[]"
        },
        name: 'jmp',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.jmp()
        }
    },
    loadProp: {
        des: {
            code: "loadProp",
            stack: "[target,property]",
            newStack: "[val]"
        },
        name: 'loadProp',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const property=runtime.popStackTop(),
                target=runtime.popStackTop()
            
            runtime.pushStack(target[property])
            runtime.next(1)
        }
    },
    setProp: {
        des: {
            code: "setProp",
            stack: "[val,target,property]",
            newStack: "[]"
        },
        name: 'setProp',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const property=runtime.popStackTop(),
                target=runtime.popStackTop(),
                val=runtime.popStackTop()
            target[property]=val
            runtime.next(1)
        }
    },
    retFunc: {
        des: {
            code: "retFunc",
            stack: "[retVal]",
            newStack: "[]",
            retStack:"retVal"
        },
        name: 'retFunc',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.retValue(runtime.popStackTop());
            runtime.gotoEnd()
        }
    },
    newObj: {
        des: {
            code: "newObj",
            stack: "[]",
            newStack: "[obj]"
        },
        name: 'newObj',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack({})
            runtime.next(1)
        }
    },
    rsetProp: {
        des: {
            code: "rsetProp",
            stack: "[target,property,val]",
            newStack: "[]"
        },
        name: 'rsetProp',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.popStackTop(),
                property=runtime.popStackTop(),
                target=runtime.popStackTop()
            target[property]=val
            runtime.next(1)
        }
    },
    movRet: {
        des: {
            code: "movRet",
            stack: "[target]",
            newStack: "[]",
            retStack:"target"
        },
        name: 'movRet',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.popStackTop()
            runtime.retValue(val);
            runtime.next(1)
        }
    },
    stackMemberMethod: {
        des: {
            code: "stackMemberMethod argsLen",
            stack: "[arg1,arg2...,tagert,method]",
            newStack: "[retVal]",
            retStack:""
        },
        name: 'stackMemberMethod',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const args=runtime.nextCodeNVal(1),
                methodName=runtime.popStackTop(),
                obj=runtime.popStackTop(),
                array=runtime.popStackTopN(args)

            runtime.pushStack(obj[methodName].apply(obj,array))
            runtime.next(2)
            // runtime.pushStack(obj[methodName](...array))
        }
    },
    callStackFunc: {
        des: {
            code: "callStackFunc argsLen",
            stack: "[arg1,arg2...,func]",
            newStack: "[retVal]",
            retStack:""
        },
        name: 'callStackFunc',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const target=runtime.popStackTop()
            const array=runtime.popStackTopN(runtime.nextCodeVal())
            runtime.pushStack(target.apply(window,array))
            runtime.next(2)
        }
    },
    newLocalClassObject: {
        des: {
            code: "newLocalClassObject tagetObjectStackPosition[stackIndex,positionIndex] argsLen",
            stack: "[arg1,arg2...]",
            newStack: "[retVal]",
            retStack:""
        },
        name: 'newLocalClassObject',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.visitStackVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2))
            const array=runtime.popStackTopN(runtime.nextCodeNVal(3))
            runtime.pushStack(Reflect.construct(val,array))
            runtime.next(4)
        }
    },
    newContextClassObject: {
        des: {
            code: "newContextClassObject tagetObjectStackPosition[stackIndex,positionIndex] argsLen",
            stack: "[arg1,arg2...]",
            newStack: "[retVal]",
            retStack:""
        },
        name: 'newContextClassObject',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const val=runtime.visitContextVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2))
            const array=runtime.popStackTopN(runtime.nextCodeNVal(3))
            runtime.pushStack(Reflect.construct(val,array))
            runtime.next(4)
        }
    },
    newContextClassObjectSelective: {
        des: {
            code: "newContextClassObjectSelective argsLen alterName",
            stack: "[arg1,arg2...,[selective,...]]",
            newStack: "[retVal]",
            retStack:""
        },
        name: 'newContextClassObjectSelective',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const args=runtime.nextCodeNVal(1),
            alterName=runtime.loadConstant(runtime.nextCodeNVal(2)),
            selective=runtime.popStackTop()
            const _v=runtime.visitContextValSelective(selective)
            const array=runtime.popStackTopN(args),target=_v[0]?_v[1]:runtime.envObject(alterName)
            runtime.pushStack(Reflect.construct(target,array))
            runtime.next(3)
        }
    },
    not: {
        des: {
            code: "not",
            stack: "[target]",
            newStack: "[retVal]",
            retStack:""
        },
        name: 'not',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(!runtime.popStackTop())
            runtime.next(1)
        }
    },
    loadErrorMap: {
        des: {
            code: "loadErrorMap codeIndex n",
            stack: "[]",
            newStack: "[]",
            retStack:""
        },
        name: 'loadErrorMap',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const _i=runtime.nextCodeVal(),_=runtime.nextCodeNVal(2)
            runtime.loadErrorMap(runtime.loadCodeArray(_i,_i+_*3))
            runtime.next(3)
        }
    },
    storeEnv: {
        des: {
            code: "storeEnv tagertObjectNameIndex",
            stack: "[target]",
            newStack: "[]",
            retStack:""
        },
        name: 'storeEnv',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushBackEnv(
                    runtime.loadConstant(runtime.nextCodeVal()),
                    runtime.popStackTop())
            runtime.next(2)
        }
    },
    loadError: {
        des: {
            code: "loadError ",
            stack: "[]",
            newStack: "[err]",
            retStack:""
        },
        name: 'loadError',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.loadError()
            runtime.next(1)
        }
    },
    throwError: {
        des: {
            code: "throwError ",
            stack: "[]",
            newStack: "[]",
            retStack:""
        },
        name: 'throwError',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.throwError()
        }
    },
    setError: {
        des: {
            code: "setError ",
            stack: "[err]",
            newStack: "[]",
            retStack:""
        },
        name: 'setError',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.setError()
            runtime.next(1)
        }
    },
    popStack: {
        des: {
            code: "popStack",
            stack: "[objToPop]",
            newStack: "[]"
        },
        name: 'popStack',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.popStackTop()
            runtime.next(1)
        }
    },
    reverse: {
        des: {
            code: "reverse",
            stack: "[num]",
            newStack: "[~num]"
        },
        name: 'reverse',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(~runtime.popStackTop())
            runtime.next(1)
        }
    },
    typeof: {
        des: {
            code: "typeof",
            stack: "[num]",
            newStack: "[typeof num]"
        },
        name: 'typeof',
        val: byteCode_define_index++,
        _apply:function(runtime){
            // const _=Object.prototype.toString.call(runtime.popStackTop()).replace(/\[object\s+(.*)\]/,"$1").toLowerCase()
            // runtime.pushStack(_=="null"?"object":_)
            runtime.pushStack(typeof runtime.popStackTop())
            runtime.next(1)
        }
    },
    void: {
        des: {
            code: "typeof",
            stack: "[num]",
            newStack: "[typeof num]"
        },
        name: 'typeof',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(void runtime.popStackTop())
            runtime.next(1)
        }
    },
    nor: {
        des: {
            code: "nor",
            stack: "[num1,num2]",
            newStack: "[num1^num2]"
        },
        name: 'nor',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(runtime.popStackTop()^runtime.popStackTop())
            runtime.next(1)
        }
    },
    defFunc: {
        des: {
            code: "defFunc paramsLen",
            stack: "[bytes]",
            newStack: "[function]"
        },
        name: 'defFunc',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(runtime.newFunc(runtime.nextCodeVal(),runtime.popStackTop(),runtime.popStackTop()))
            runtime.next(2)
        }
    },
    loadFuncDef: {
        des: {
            code: "loadFuncDef codeIndex",
            stack: "[]",
            newStack: "[bytes]"
        },
        name: 'loadFuncDef',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(runtime.loadCodeArrayN(runtime.nextCodeVal()))
            runtime.next(2)
        }
    },
    loadContext: {
        des: {
            code: "loadContext parentIndex stackIndex",
            stack: "[]",
            newStack: "[]"
        },
        name: 'loadContext',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.loadContext(runtime.nextCodeVal(),runtime.nextCodeNVal(2))
            runtime.next(3)
        }
    },
    loadContextVal: {
        des: {
            code: "loadContextVal  tagetObjectStackPosition[stackIndex,positionIndex]",
            stack: "[]",
            newStack: "[varVal]"
        },
        name: 'loadContextVal',
        val: byteCode_define_index++,
        _apply:function(runtime){
            
            const val=runtime.visitContextVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2))
            runtime.pushStack(val)
            runtime.next(3)
        }
    },
    loadContextValSelective: {
        des: {
            code: "loadContextValSelective tagertObjectNameIndex",
            stack: "[[]...]",
            newStack: "[varVal]"
        },
        name: 'loadContextValSelective',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const selective=runtime.popStackTop(),objName=runtime.loadConstant(runtime.nextCodeVal())
            const _v=runtime.visitContextValSelective(selective)
            runtime.pushStack(_v[0]?_v[1]:runtime.envObject(objName))
            runtime.next(2)
        }
    },
    byteMovRight: {
        des: {
            code: "byteMovRight",
            stack: "[num,step]",
            newStack: "[num>>step]"
        },
        name: 'byteMovRight',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop(),left=runtime.popStackTop()
            runtime.pushStack(left>>right)
            runtime.next(1)
        }
    },
    byteUnsignedMovRight: {
        des: {
            code: "byteUnsignedMovRight",
            stack: "[num,step]",
            newStack: "[num>>>step]"
        },
        name: 'byteUnsignedMovRight',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop(),left=runtime.popStackTop()
            runtime.pushStack(left>>>right)
            runtime.next(1)
        }
    },
    byteMovLeft: {
        des: {
            code: "byteMovLeft",
            stack: "[num,step]",
            newStack: "[num<<step]"
        },
        name: 'byteMovLeft',
        val: byteCode_define_index++,
        _apply:function(runtime){
            const right=runtime.popStackTop(),left=runtime.popStackTop()
            runtime.pushStack(left<<right)
            runtime.next(1)
        }
    },
    cpContext:{
        des: {
            code: "cpContext [runtimeIndex,stackIndex]",
            stack: "[]",
            newStack: "[[...]]"
        },
        name: 'cpContext',
        val: byteCode_define_index++,
        _apply:function(runtime){
            runtime.pushStack(runtime.childContext(runtime.nextCodeVal(),runtime.nextCodeNVal(2)))
            runtime.next(3)
        }
    }
}