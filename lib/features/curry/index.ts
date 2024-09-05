// curry index.ts
/**
 * 函数柯里化工具函数
 * !注意:只能只用普通function函数,不能使用箭头函数,也不能使用剩余参数
 * @example
 * // 示例函数
 * function add(a: number, b: number, c: number) {
 *     return a + b + c;
 * }
 *
 * // 使用 curry 包装函数
 * const curriedAdd = curry(add);
 *
 * // 柯里化调用
 * console.log(curriedAdd(1)(2)(3)); // 输出 6
 * console.log(curriedAdd(1, 2)(3)); // 输出 6
 * console.log(curriedAdd(1)(2, 3)); // 输出 6
 * console.log(curriedAdd(1, 2, 3)); // 输出 6
 *
 * @param fn
 */
export function curry(fn: Function) {
    return new Proxy(fn, {
        apply(target, thisArg, args) {
            // 如果收集到的参数数量足够，则执行函数
            if (args.length >= target.length) {
                return target.apply(thisArg, args);
            }
            // 否则，返回一个新的函数，继续收集剩余的参数
            return (...nextArgs: any[]) => Reflect.apply(target, thisArg, [...args, ...nextArgs]);
        }
    });
}