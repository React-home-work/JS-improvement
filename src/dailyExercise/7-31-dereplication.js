// 编程题，根据以下要求，写一个数组去重函数（蘑菇街）

// 如传入的数组元素为[123, "meili", "123", "mogu", 123]，则输出：[123, "meili", "123", "mogu"]

// 如传入的数组元素为[123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"]，则输出：[123, [1, 2, 3], [1, "2", 3], "meili"]

// 如传入的数组元素为[123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"]，则输出：[123, {a: 1}, {a: {b: 1}}, {a: "1"}, "meili"]

/* ----------------------------------------- */

// 扔到object上去重，如果发现key重复，则移除数组当前元素
// 用string比较key, value 为 {index: 数组中的, value: 真实value}, 用JSON.stringify可以保留obj类型原有的引号
// 使用map可以保持数据被set进去的顺序，从而达到有序遍历
// 上述方法缺失了如果2个object相同但是key的顺序不同，则用JSON.stringify则会认为不同

const dereplicate = arr => {
    let dereplicatMap = new Map();
    let dereplicatArr = [];
    for (let i = 0, len = arr.length; i < len; i++) {
        let key = JSON.stringify(arr[i]);
        if (!dereplicatMap.has(key)) {
            dereplicatMap.set(key, arr[i]);
            dereplicatArr.push(arr[i]);
        }
    }
    return dereplicatArr;
}

let arr1 = [123, "meili", "123", "mogu", 123];
let arr2 = [123, [1, 2, 3], [1, "2", 3], [1, 2, 3], "meili"];
let arr3 = [123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili"];
console.log(dereplicate(arr1));
console.log(dereplicate(arr2));
console.log(dereplicate(arr3));
