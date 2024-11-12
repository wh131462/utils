// tree index.ts
export class TreeUtils{
    /**
     * 树结构转扁平化结构 - 可指定转化的字段对象
     * @param tree
     * @param specifyFields
     */
    static treeToFlat(tree: Array<any>, specifyFields: Record<"id" | "children" | "parentId", string> = {
        id: "id",
        children: "children",
        parentId: "parentId"
    }): Array<any> {
        if (!tree.length) return [];
        const flattenTree = (item: any, parent: any) => {
            const children = item[specifyFields.children];
            delete item[specifyFields.children];
            return [
                {...item, ...(parent ? {[specifyFields.parentId]: parent} : undefined)},
                ...(children?.length ?
                    children.flatMap((n: any) => flattenTree(n, item[specifyFields.id])) :
                    [])
            ];
        }
        return tree.flatMap(flattenTree)
    }

    /**
     * 扁平化转树结构 - 可指定转化的字段对象
     * @param flat
     * @param specifyFields
     */
    static flatToTree(flat: Array<any>, specifyFields: Record<"id" | "children" | "parentId", string> = {
        id: "id",
        children: "children",
        parentId: "parentId"
    }): Array<any> {
        const map = new Map();
        const roots: Node[] = [];

        flat.forEach((item) => {
            map.set(item[specifyFields.id], {...item, [specifyFields.children]: []});
        });

        flat.forEach((item) => {
            const node = map.get(item[specifyFields.id]);
            if (item[specifyFields.parentId]) {
                const parent = map.get(item[specifyFields.parentId]);
                if (parent) {
                    delete node[specifyFields.parentId];
                    parent[specifyFields.children].push(node);
                }
            } else {
                delete node[specifyFields.parentId];
                roots.push(node);
            }
        });
        return roots;
    }
}
