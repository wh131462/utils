/**
 * 获取对象中存在的属性值
 * @example
 * const data = {a:{b:1}};
 * value(data,"a.b");// console => 1
 * @param data
 * @param prop
 */
export const getValue = (data: Record<string, any>, prop: string | string[]):any => {
    let ps = Array.isArray(prop) ? prop : prop.split('.');
    try{
        return ps.length == 1 ? data[ps.shift()!] : getValue(data[ps.shift()!], ps);
    }catch(e){
        return undefined;
    }
}
/**
 * 设置对象中的属性值
 * @param obj
 * @param prop
 * @param value
 */
export const setValue = (obj: Record<string, any>, prop: string, value: any)=>{
    const keys = prop.split('.');
    let current = obj??{};
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current)) {
            current[key] = {};
        }
        current = current[key];
    }
    current[keys[keys.length - 1]] = value;
}