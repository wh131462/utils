/**
 * 获取对应长度的随机字符串
 * @example
 * RandomId.create();
 * // 'nq4YK2CqYV3ncR60'
 */
export class RandomId {
    /**
     * 当前版本
     * 使用参数变量 与偏移量实现
     * @param length
     */
    static create(length: number = 16) {
        return Array.from({length}, (_, __, i = Math.floor(Math.random() * 3), j = '0Aa'[i].charCodeAt(0), k = '9Zz'[i].charCodeAt(0)) => String.fromCharCode(j + Math.floor(Math.random() * (k - j + 1)))).join('');
    }

    /**
     * v1版本
     * 最简单的字符串随机下标版本
     * @param length
     */
    static v1(length:number = 16){
        return Array.from({ length }, () => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 62)]).join('')
    }

    /**
     * v2 版本
     * 使用charCodeAt 和 String.fromCharCode与reduce+throw实现
     * @param length
     */
    static v2(length:number = 16){
        const getRandomChar = () => {
            try {
                return '09AZaz'
                    .split('')
                    .map((o) => o.charCodeAt(0))
                    .reduce((r, _, i, arr) => {
                        if (i % 2 !== 0) return r; // 跳过结束位
                        const rangeSize = arr[i + 1] - arr[i] + 1; // 当前范围的大小
                        if (r < rangeSize) {
                            throw arr[i] + r; // 计算最终字符的charCode
                        }
                        return r - rangeSize; // 减去当前范围大小，继续检查下一个范围
                    }, Math.floor(Math.random() * 62));
            } catch (res) {
                return String.fromCharCode(res as number); // 根据捕获的charCode生成字符
            }
        };
        return Array.from({ length }, () => getRandomChar()).join('');
    }
}

