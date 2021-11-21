export default {
    add: {
        des: {
            code: "add",
            stack: "[arg1,arg2]",
            newStack: "[retVal]"
        },
        name: 'add',
        val: 1,
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
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
        apply:function(runtime){
            const val=runtime.popStackTop()
            runtime.retValue(val);
            runtime.next(1)
        }
    },
    stackMemberMethod: {
        des: {
            code: "stackMemberMethod argsLen",
            stack: "[target]",
            newStack: "[arg1,arg2...,tagert,method]",
            retStack:"retVal"
        },
        name: 'movRet',
        val: 44,
        apply:function(runtime){
            const args=runtime.nextCodeNVal(1)
            const methodName=runtime.popStackTop()
            const obj=runtime.popStackTop()
            const array=runtime.popStackTopN(args)
            runtime.pushStack(obj[methodName](...array))
            runtime.next(2)
        }
    },
}