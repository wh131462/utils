// work-utility index.ts
export class WorkUtility {
    /**
     * 获取随机人员分组
     * @param names
     * @param groupSize
     */
    static getRandomSplitGroup = (names: string[], groupSize = 2) => {
        return names
            .sort(() => Math.random() - 0.5)
            .reduce((res: string[][], cur: string, index: number) => {
                const groupIndex = Math.floor(index / groupSize);
                if (!res[groupIndex]) res[groupIndex] = [];
                res[groupIndex].push(cur);
                return res;
            }, []);
    };
}