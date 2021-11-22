export default {
    add: {
        des: {
            code: "add",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'add',
        val: 1,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            runtime.pushStack(left+right)
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
        val: 2,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            runtime.pushStack(left-right)
            runtime.next(1)
        }
    },
    mul: {
        des: {
            code: "mul",
            stack: "[arg1,arg2]",
        },
        name: 'mul',
        val: 3,
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
        val: 4,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            runtime.stack.push(left/right)
            runtime.next(1)
        }
    },
    mod: {
        des: {
            code: "mod",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'mod',
        val: 5,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            runtime.pushStack(left%right)
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
        val: 6,
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
        val: 7,
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
        val: 8,
        _apply:function(runtime){
            const index=runtime.nextCodeVal()
            const str=runtime.loadConstant(index)
            runtime.pushStack(str)
            runtime.next(2)
        }
    },
    mkArr: {
        des: {
            code: "mkArr argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[[arg1,arg2,arg3...]]"
        },
        name: 'makeArray',
        val: 9,
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
        val: 10,
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
        val: 11,
        _apply:function(runtime){
            const val=runtime.nextCodeVal()
            runtime.pushStack(val)
            runtime.next(2)
        }
    },
    newStack: {
        des: {
            code: "newStack",
            stack: "[]",
            newStack: "[][]"
        },
        name: 'newStack',
        val: 12,
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
        val: 13,
        _apply:function(runtime){
            const val=runtime.popStackTop()
            runtime.storeStackValue(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2),val)
            runtime.next(3)
        }
    },
    newClassObject: {
        des: {
            code: "newClassObject classNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'newClassObject',
        val: 14,
        _apply:function(runtime){
            const index=runtime.nextCodeVal()
            const className=runtime.loadConstant(index)
            const args=runtime.nextCodeNVal(2)
            const array=runtime.popStackTopN(args)
            runtime.pushStack(new (runtime.envObject(className))(...array))
            runtime.next(3)
        }
    },
    callFunc: {
        des: {
            code: "callFunc functionNameIndex argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[retVal]"
        },
        name: 'callFunc',
        val: 15,
        _apply:function(runtime){
            const index=runtime.nextCodeVal()
            const className=runtime.loadConstant(index)
            const args=runtime.nextCodeNVal(2)
            const array=runtime.popStackTopN(args)
            runtime.pushStack(runtime.envObject(className)(...array))
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
        val: 16,
        _apply:function(runtime){
            const val=runtime.visitStackVal(runtime.nextCodeNVal(1),runtime.nextCodeNVal(2))
            const index=runtime.nextCodeNVal(3)
            const methodName=runtime.loadConstant(index)
            const args=runtime.nextCodeNVal(4)
            const array=runtime.popStackTopN(args)
            runtime.pushStack(val[methodName](...array))
            runtime.next(5)
        }
    },
    popStack: {
        des: {
            code: "popStack",
            stack: "[objToPop]",
            newStack: "[]"
        },
        name: 'popStack',
        val: 17,
        _apply:function(runtime){
            runtime.popStack()
            runtime.next(1)
        }
    },
    and: {
        des: {
            code: "and",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'and',
        val: 18,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            if(right&&left){
                runtime.pushStack(1)
            }else{
                runtime.pushStack(0)
            }
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
        val: 19,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            if(right||left){
                runtime.pushStack(1)
            }else{
                runtime.pushStack(0)
            }
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
        val: 20,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
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
        val: 21,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
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
        val: 22,
        _apply:function(runtime){
            runtime.pushStack(null)
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
        val: 23,
        _apply:function(runtime){
            const objName=runtime.loadConstant(runtime.nextCodeVal())
            const methodName=runtime.loadConstant(runtime.nextCodeNVal(2))
            const args=runtime.nextCodeNVal(3)
            const array=runtime.popStackTopN(args)
            runtime.pushStack(runtime.envObject(objName)[methodName](...array))
            runtime.next(4)
        }
    },
    loadEnv: {
        des: {
            code: "loadEnv tagertObjectNameIndex",
            stack: "[]",
            newStack: "[targetObject]"
        },
        name: 'loadEnv',
        val: 24,
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
        val: 25,
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
        val: 26,
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
        val: 27,
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
        val: 28,
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
        val: 29,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            if(left<right){
                runtime.pushStack(1)
            }else{
                runtime.pushStack(0)
            }
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
        val: 30,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            if(left>right){
                runtime.pushStack(1)
            }else{
                runtime.pushStack(0)
            }
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
        val: 31,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            if(left<=right){
                runtime.pushStack(1)
            }else{
                runtime.pushStack(0)
            }
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
        val: 32,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            if(left>=right){
                runtime.pushStack(1)
            }else{
                runtime.pushStack(0)
            }
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
        val: 33,
        _apply:function(runtime){
            const val=runtime.popStackTop()
            runtime.pushStack(val+1)
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
        val: 34,
        _apply:function(runtime){
            const val=runtime.popStackTop()
            runtime.pushStack(val-1)
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
        val: 35,
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
        val: 36,
        _apply:function(runtime){
            const right=runtime.popStackTop()
            const left=runtime.popStackTop()
            if(left===right){
                runtime.pushStack(1)
            }else{
                runtime.pushStack(0)
            }
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
        val: 37,
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
        val: 38,
        _apply:function(runtime){
            const property=runtime.popStackTop()
            const target=runtime.popStackTop()
            
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
        val: 39,
        _apply:function(runtime){
            const property=runtime.popStackTop()
            const target=runtime.popStackTop()
            const val=runtime.popStackTop()
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
        val: 40,
        _apply:function(runtime){
            const val=runtime.popStackTop()
            runtime.retVal(val);
            runtime.next(1)
        }
    },
    newObj: {
        des: {
            code: "newObj",
            stack: "[]",
            newStack: "[obj]"
        },
        name: 'newObj',
        val: 41,
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
        val: 42,
        _apply:function(runtime){
            const val=runtime.popStackTop()
            const property=runtime.popStackTop()
            const target=runtime.popStackTop()
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
        val: 43,
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
        val: 44,
        _apply:function(runtime){
            const args=runtime.nextCodeNVal(1)
            const methodName=runtime.popStackTop()
            const obj=runtime.popStackTop()
            const array=runtime.popStackTopN(args)
            runtime.pushStack(obj[methodName](...array))
            runtime.next(2)
        }
    },
    callLocalFunc: {
        des: {
            code: "callLocalFunc tagetObjectStackPosition[stackIndex,positionIndex] argsLen",
            stack: "[arg1,arg2...]",
            newStack: "[retVal]",
            retStack:""
        },
        name: 'callLocalFunc',
        val: 45,
        _apply:function(runtime){
            //TODO 尚未实现自定义方法调用
            runtime.next(4)
            throw new Error("not implement instruction callLocalFunc")
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
        val: 46,
        _apply:function(runtime){
            //TODO 尚未实现自定义方法调用
            runtime.next(4)
            throw new Error("not implement instruction newLocalClassObject")
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
        val: 47,
        _apply:function(runtime){
            const val=runtime.popStackTop()
            runtime.pushStack(val?0:1)
            runtime.next(1)
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
        val: 48,
        _apply:function(runtime){
            const val=runtime.popStackTop()
            const target=runtime.loadConstant(runtime.nextCodeVal())
            runtime.pushBackEnv(target,val)
            runtime.next(2)
        }
    }
}