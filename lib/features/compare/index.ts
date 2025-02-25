// compare index.ts
/**
 * 比较函数
 * 比较对象和任何基础类型
 * @example
 * compare(1,1,1) // true
 * compare({a:1},{a:1},{a:1,b:2}); // false
 * @param objs
 */
export const compare = (...objs: any[]): boolean => {
    if (objs.length < 2) return true;
    return objs.every((obj, i) =>
        i === 0 || _compare(objs[i - 1], obj)
    );
};

/**
 * 工具函数 compare 判别标准:对比两个对象 对象的属性相同 那么对象就是相同
 */
function _compare(obj1: any, obj2: any): boolean {
    // 处理 NaN 特例
    if (typeof obj1 === 'number' && typeof obj2 === 'number') {
        if (Number.isNaN(obj1) && Number.isNaN(obj2)) return true;
    }

    // 处理 Date 对象
    if (obj1 instanceof Date && obj2 instanceof Date) {
        return obj1.getTime() === obj2.getTime();
    }

    // 处理其他对象类型
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return obj1 === obj2;
    }

    // 处理数组顺序敏感比较
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        return obj1.length === obj2.length &&
            obj1.every((item, i) => _compare(item, obj2[i]));
    }

    // 处理普通对象
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every(key =>
        Object.prototype.hasOwnProperty.call(obj2, key) &&
        _compare(obj1[key], obj2[key])
    );
}