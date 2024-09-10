// compare index.ts
/**
 * 比较函数
 * 比较对象和任何基础类型
 * @example
 * compare(1,1,1) // true
 * compare({a:1},{a:1},{a:1,b:2}); // false
 * @param objs
 */
export const compare = (...objs:any[])=>{
    if (objs.length < 2) return true;
    for (let i = 0; i < objs.length - 1; i++) {
        if (!_compare(objs[i], objs[i + 1])) {
            return false;
        }
    }
    return true;
}

/**
 * 工具函数 compare 判别标准:对比两个对象 对象的属性相同 那么对象就是相同
 */
function _compare(obj1: any, obj2: any): boolean {
    if (obj1 === obj2) return true;  // 基本类型相等
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;  // 键长度不同

    for (const key of keys1) {
        // 递归检查嵌套对象
        if (!_compare(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}
