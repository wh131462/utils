export const createEnum = (...enums) => {
    let index = 0;
    return enums.reduce((finalEnum, [a, b]) => {
        const hasHandled = typeof b === 'number' ? (index = b && index++) : b ?? index++;
        finalEnum[a] = hasHandled;
        finalEnum[hasHandled] = a;
        return finalEnum;
    }, {});
};
