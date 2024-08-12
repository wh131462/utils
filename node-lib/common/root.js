import { dirname, sep } from 'path';
import { logger } from './logger.js';
import { readdir } from 'node:fs/promises';

export const setRoot  = async ()=>{
    const root = await where();
    process.chdir(root);
}

/**
 * where
 * 返回当前项目根路径
 */
export const where = async () => {
    let projectRoot = process.cwd();
    try {
        while (projectRoot !== sep) {
            // 使用 path.sep 获取系统特定的路径分隔符
            const files = await readdir(projectRoot);
            if (files.includes('package.json')) {
                break;
            }
            projectRoot = dirname(projectRoot); // 使用 path.dirname 获取上级目录
        }
        if (projectRoot === sep) {
            new Error('Not in a x project.');
        }
        return projectRoot;
    } catch (error) {
        // 处理文件系统读取失败的错误
        logger.error(error);
        throw error;
    }
};