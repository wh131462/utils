// safe-json index.ts
/**
 * 安全JSON对象
 * @example
 * SafeJson.parse("1", undefined);// return undefined
 *
 * const obj = { a: 1, b: 2, c: obj };
 * const safeStringified = SafeJson.stringify(obj);
 * console.log(safeStringified); // 输出: {"a":1,"b":2,"c":"[Circular]"}
 */
export class SafeJson {
    /**
     * 安全解析JSON字符串
     * @param jsonStr 要解析的JSON字符串
     * @param defaultValue 解析失败时返回的默认值
     * @returns 解析后的对象或默认值
     */
    static parse<T = any>(jsonStr: string, defaultValue: T | null = null): T | null {
        try {
            return JSON.parse(jsonStr);
        } catch (error) {
            console.error('JSON解析错误:', error);
            return defaultValue;
        }
    }

    /**
     * 安全序列化对象为JSON字符串
     * @param obj 要序列化的对象
     * @param space 美化输出的空格数量
     * @returns 序列化后的JSON字符串
     */
    static stringify(obj: any, space: number | undefined = undefined): string {
        try {
            return JSON.stringify(obj, SafeJson.replacer, space);
        } catch (error) {
            console.error('JSON序列化错误:', error);
            return 'null';
        }
    }

    /**
     * 替换循环引用的replacer函数
     * @param key 对象的键
     * @param value 对象的值
     * @returns 处理后的值
     */
    private static replacer(key: string, value: any): any {
        const seen = new WeakSet();
        return function (this: any, k: string, v: any) {
            if (typeof v === 'object' && v !== null) {
                if (seen.has(v)) {
                    return '[Circular]'; // 处理循环引用
                }
                seen.add(v);
            }
            return v;
        }.call(this, key, value);
    }
}