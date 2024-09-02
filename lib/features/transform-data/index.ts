/**
 * @example
 * const data = {
 *   name: "Alice",
 *   age: 30,
 *   tags: ["admin", "user"],
 *   details: {
 *     address: "123 Main St",
 *     numbers: [
 *       { a: 1 },
 *       { a: 1 },
 *       { a: 1 }
 *     ]
 *   }
 * };
 *
 * const config = {
 *   "name": { newField: "userName" },
 *   "age": { transform: (age: number) => age + 1 },
 *   "tags": { transform: (tag: string) => tag.toUpperCase(), isArray: true },
 *   "details.numbers": {
 *     transform: { 'a': { newField: "b" } }, // 转换数组中的对象字段
 *     isArray: true
 *   }
 * };
 *
 * const result = transformData(data, config, TransformMode.add);
 * console.log(result);
 */

export enum TransformMode {
    add,
    replace
}

type TransformValueFn = (value: any) => any;
type TransformType = {
    newField?: string;
    transform?: TransformValueFn | { [key: string]: TransformType };
    isArray?: boolean;
};

export function transformData(
    data: Record<string, any>,
    config: { [oldField: string]: TransformType },
    mode: TransformMode = TransformMode.replace
): Record<string, any> {
    let result = mode === TransformMode.replace ? {} : {...data};

    /**
     * 设置嵌套属性值
     * @param obj
     * @param path
     * @param value
     */
    const setNestedProperty = (obj: Record<string, any>, path: string, value: any) => {
        const keys = path.split('.');
        let current = obj;
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current)) {
                current[key] = {};
            }
            current = current[key];
        }
        current[keys[keys.length - 1]] = value;
    };

    /**
     * 获取嵌套的属性值
     * @param obj
     * @param path
     */
    const getNestedProperty = (obj: Record<string, any>, path: string): any => {
        return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);
    };

    for (const [oldField, transformConfig] of Object.entries(config)) {
        let newValue: any;
        let newKey: string = oldField;

        const oldValue = getNestedProperty(data, oldField);

        if (transformConfig.isArray && Array.isArray(oldValue)) {
            newValue = oldValue.map(item => {
                if (typeof transformConfig.transform === 'object' && !Array.isArray(transformConfig.transform)) {
                    return transformData(item, transformConfig.transform, TransformMode.add);
                } else if (typeof transformConfig.transform === 'function') {
                    return transformConfig.transform(item);
                } else {
                    return item;
                }
            });
        } else if (typeof transformConfig.transform === 'function') {
            newValue = transformConfig.transform(oldValue);
        } else {
            newValue = oldValue;
        }

        if (transformConfig.newField) {
            newKey = transformConfig.newField;
        }

        setNestedProperty(result, newKey, newValue);
    }

    return result;
}
