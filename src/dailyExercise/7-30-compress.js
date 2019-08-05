// ### Object 压缩转换
// - 使用递归 （执行时间 0.55s）

const entry = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
}

const output = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}

const compressObj = (entry, inputObj, keyName) => {
    let outputObj = inputObj ? inputObj : {};
    for (let key in entry) {
        let keyNamePlus = keyName ? (keyName + '.' + key) : key;
        if (typeof entry[key] === "object") {
            compressObj(entry[key], outputObj, keyNamePlus);
        } else {
            outputObj[keyNamePlus] = entry[key];
        }
    }
    return outputObj;
}

console.log(compressObj(entry));


// - 使用队列进行广度遍历 (0.4s)
var entry = {
    a: {
        b: {
            c: {
                dd: 'abcdd'
            }
        },
        d: {
            xx: 'adxx'
        },
        e: 'ae'
    }
}

// 要求转换成如下对象
var output = {
    'a.b.c.dd': 'abcdd',
    'a.d.xx': 'adxx',
    'a.e': 'ae'
}

function func(obj) {
    let res = {}
    let queue = [{
        prop: "",
        value:obj
    }]

    while (queue.length) {
        let {prop,value} = queue.shift()
        Object.keys(value).forEach(key => {
            if (typeof value[key] === 'object') {
                queue.push({
                    prop: `${prop}${prop && "."}${key}`,
                    value: value[key]
                })
            }else{
                res[`${prop}${prop && "."}${key}`] = value[key]
            }
        })
    }
    return res
}

console.log(func(entry))

// - 使用队列的方式进行广度遍历，性能比递归遍历更好，同时大大减少爆栈的风险

// - 当函数实现了尾递归的情况下，就此题来说，队列遍历和递归遍历的性能如何比较，哪一方更具优势？
// - 结论:我认为在实现了尾递归的情况下,队列遍历的性能还是要好一点。

// - 原因：递归之所以会效率不高，是它执行的时候依赖子问题，所以在执行树上，会有很多相同的节点，我认为函数尾调用实现了将那些子问题当做中间变量保存了起来，当做该函数新的参数继续调用，那么它实现就和层次遍历所需要做的操作次数是差不多的。但是尾调用也会开辟新的函数执行环境，但N的数量达到一定程度，频繁创建和销毁函数执行环境也是需要一定时间吧，而队列遍历只要开辟一次函数执行环境。

// #### Object 解压缩
var entry1 = {
  'a.b.c.dd': 'abcdd',
  'a.d.xx': 'adxx',
  'a.e': 'ae'
}

// 要求转换成如下对象
var output1 = {
  a: {
   b: {
     c: {
       dd: 'abcdd'
     }
   },
   d: {
     xx: 'adxx'
   },
   e: 'ae'
  }
}

const origizeObj = (keyString, value, obj) => {
    let firstDotIndex = keyString.indexOf('.');
    if(firstDotIndex !== -1) {
        let currKeyName = keyString.substring(0, firstDotIndex);
        let nextKeyName = keyString.substring(firstDotIndex + 1);
        obj[currKeyName] = obj[currKeyName] ? obj[currKeyName] : {};
        origizeObj(nextKeyName, value, obj[currKeyName]);
    } else {
        obj[keyString] = value;
    }
    return obj;
}

const uncompressObj = (entryObj) => {
    let valueArr = [];
    let keyArr = [];
    let obj = {};
    for (let key in entryObj) {
        valueArr.push(entryObj[key]);
        keyArr.push(key);
    }
    for(let i = 0, len = keyArr.length; i < len; i++) {
        origizeObj(keyArr[i], valueArr[i], obj);
    }
    return obj;
}

uncompressObj(entry1);

// 思考方式：
// 1.  将值和key分别解析为数组，
// 2.  单独解析key，直到没有点符号后赋给值（如果有就继续递归解析）