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
            runtime.stack.push(left+right)
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
            runtime.stack.push(left-right)
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
            runtime.stack.push(left*right)
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
            runtime.stack.push(left%right)
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
            code: "newClassObject stringValueIndex",
            stack: "[]",
            newStack: "[stringVal]"
        },
        name: 'loadConst',
        val: 8,
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
    mkArr: {
        des: {
            code: "mkArr argsLenth",
            stack: "[arg1,arg2,arg3...]",
            newStack: "[[arg1,arg2,arg3...]]"
        },
        name: 'makeArray',
        val: 9,
        apply:function(runtime){
            const array=runtime.popStackCodeTopN()
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