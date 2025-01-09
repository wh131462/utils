/**
 * 获取对应长度的随机字符串
 * @example
 * RandomId.create();
 * // 'nq4YK2CqYV3ncR60'
 */
export class RandomId {
    static instanceId = Math.floor(Math.random() * 10000);
    /**
     * 创建随机id
     * - use v4()
     */
    static create(length: number = 16){
        return RandomId.v4(length);
    }
    /**
     * v1版本
     * 使用参数变量 与偏移量实现
     * @param length
     */
    static v1(length: number = 16) {
        return Array.from({length}, (_, __, i = Math.floor(Math.random() * 3), j = '0Aa'[i].charCodeAt(0), k = '9Zz'[i].charCodeAt(0)) => String.fromCharCode(j + Math.floor(Math.random() * (k - j + 1)))).join('');
    }

    /**
     * v2版本
     * 最简单的字符串随机下标版本
     * @param length
     */
    static v2(length:number = 16){
        return Array.from({ length }, () => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 62)]).join('')
    }

    /**
     * v3 版本
     * 使用charCodeAt 和 String.fromCharCode与reduce+throw实现
     * @param length
     */
    static v3(length:number = 16){
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


    /**
     * v4版本
     * uuid - 最小长度为8
     * @param length
     */
    static v4(length = 16): string {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        const charsLength = chars.length;

        // 获取时间戳并限制长度
        const timestamp = (Date.now() + this.instanceId).toString(36);

        // 确定随机部分的长度
        const randomLength = Math.max(0, length - timestamp.length);

        // 生成随机部分
        let randomPart = '';
        if (randomLength > 0) {
            if (window.crypto && window.crypto.getRandomValues) {
                const array = new Uint8Array(randomLength);
                window.crypto.getRandomValues(array);
                randomPart = Array.from(array, (byte) => chars[byte % charsLength]).join('');
            } else {
                for (let i = 0; i < randomLength; i++) {
                    randomPart += chars[Math.floor(Math.random() * charsLength)];
                }
            }
        }

        // 组合时间戳和随机部分，并确保长度符合要求
        return (timestamp + randomPart).substring(0, length);
    }
}

