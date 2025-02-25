import { describe, it, expect } from 'vitest';
import { deepMerge } from './index'; // 根据你的文件路径调整导入

describe('deepMerge', () => {
    it('should merge two simple objects', () => {
        const target = { a: 1, b: 2 };
        const source = { b: 3, c: 4 };
        const result = deepMerge(target, source);

        expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('should merge nested objects', () => {
        const target = { a: 1, b: { c: 2, d: 3 } };
        const source = { b: { c: 4, e: 5 }, f: 6 };
        const result = deepMerge(target, source);

        expect(result).toEqual({ a: 1, b: { c: 4, d: 3, e: 5 }, f: 6 });
    });

    it('should merge arrays by concatenation', () => {
        const target = { a: [1, 2] };
        const source = { a: [3, 4] };
        const result = deepMerge(target, source);

        expect(result).toEqual({ a: [1, 2, 3, 4] });
    });

    it('should handle merging objects with different types', () => {
        const target = { a: 1, b: { c: 2 } };
        const source = { b: { c: [3, 4] }, d: 5 };
        const result = deepMerge(target, source);

        expect(result).toEqual({ a: 1, b: { c: [3, 4] }, d: 5 });
    });

    it('should not merge non-object properties', () => {
        const target = { a: 1, b: 'hello' };
        const source = { b: 'world', c: 3 };
        const result = deepMerge(target, source);

        expect(result).toEqual({ a: 1, b: 'world', c: 3 });
    });

    it('should handle empty objects', () => {
        const target = {};
        const source = { a: 1, b: 2 };
        const result = deepMerge(target, source);

        expect(result).toEqual({ a: 1, b: 2 });
    });
});