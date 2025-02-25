import { describe, expect, it } from 'vitest';
import { compare } from './index';

describe('compare 函数深度比较测试套件', () => {
    // 基础类型测试
    it('基本类型比较', () => {
        expect(compare(1, 1)).toBe(true);
        expect(compare('a', 'a')).toBe(true);
        expect(compare(true, true)).toBe(true);
        expect(compare(null, null)).toBe(true);
        expect(compare(undefined, undefined)).toBe(true);
        expect(compare(Symbol('foo'), Symbol('foo'))).toBe(false); // Symbol不同实例
    });

    // 对象结构测试
    it('简单对象比较', () => {
        const objA = { a: 1, b: { c: 2 } };
        const objB = { a: 1, b: { c: 2 } };
        const objC = { a: 1, b: { c: 3 } };

        expect(compare(objA, objB)).toBe(true);
        expect(compare(objA, objC)).toBe(false);
    });

    // 边界条件测试
    it('特殊对象处理', () => {
        // 数组比较
        expect(compare([1, { a: 2 }], [1, { a: 2 }])).toBe(true);
        expect(compare([1, 2], [2, 1])).toBe(false);

        // 日期对象
        const date1 = new Date(2023, 0, 1);
        const date2 = new Date(2023, 0, 1);
        expect(compare(date1, date2)).toBe(true);
        expect(compare(date1, new Date())).toBe(false);

        // 函数比较
        const func1 = () => {};
        const func2 = () => {};
        expect(compare(func1, func2)).toBe(false);
    });

    // 多参数测试
    it('多个参数比较', () => {
        expect(compare({ a: 1 }, { a: 1 }, { a: 1 })).toBe(true);
    });

    // 异常情况测试
    it('无效输入处理', () => {
        expect(compare({}, null)).toBe(false);
        expect(compare(undefined, null)).toBe(false);
        expect(compare({ a: undefined }, { a: undefined })).toBe(true);
        expect(compare({ a: NaN }, { a: NaN })).toBe(true); // NaN特殊处理
    });
});