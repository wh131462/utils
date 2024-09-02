/**
 * 获取对象中存在的属性值
 * @example
 * const data = {a:{b:1}};
 * value(data,"a.b");// console => 1
 * @param data
 * @param prop
 */
export const value = (data: Record<string, any>, prop: string | string[]):any => {
    let ps = Array.isArray(prop) ? prop : prop.split('.');
    try{
        return ps.length == 1 ? data[ps.shift()!] : value(data[ps.shift()!], ps);
    }catch(e){
        return undefined;
    }
}