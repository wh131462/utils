// merge index.ts
export function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(
    target: T,
    source: U
): T & U {
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            const sourceValue = source[key];
            const targetValue = target[key];
            // 判断是否需要递归合并
            if (sourceValue as any instanceof Object && key in target && targetValue as any instanceof Object) {
                // 处理数组拼接
                if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
                    (target as any)[key] = [...targetValue, ...sourceValue];
                } else {
                    // 递归合并普通对象
                    deepMerge(targetValue, sourceValue);
                }
            } else {
                // 直接赋值基本类型或不同质对象
                (target as any)[key] = sourceValue;
            }
        }
    }
    return target as T & U;
}