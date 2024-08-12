import {resolve} from 'node:path';
import {copyFile, mkdir, readdir, rm, writeFile} from 'node:fs/promises';
import esbuild from 'esbuild';
import {readFileSync} from "node:fs";
import {logger} from "#common/cli/logger.js";

const outputDir = 'dist';
export const esbuildConfig = {
    entryPoints: ['lib/main.ts'], // 入口文件
    bundle: true,                  // 将所有依赖打包到一个文件
    outfile: `${outputDir}/lib/main.js`,     // 输出文件
    platform: 'node',              // 或 'browser'，根据你的环境选择
    sourcemap: true,               // 生成 sourcemap 文件，方便调试
    minify: true,                  // 是否压缩输出文件
    target: ['es2020'],
    loader: {'.ts': 'ts'},
}

/**
 * 站前准备
 */
async function beforeBuild() {
    const oldDist = resolve(outputDir);
    await rm(oldDist, {force: true, recursive: true});
}

/**
 * 战后处理
 */
async function afterBuild() {
    // 创建新package.js
    const packageJson = JSON.parse(readFileSync(resolve('package.json'), 'utf-8'));
    const ignoreProperties = ["bin", "devDependencies", "scripts", "main", "imports"];
    ignoreProperties.forEach(prop => {
        delete packageJson[prop];
    })
    Object.assign(packageJson, {main: "lib/main.js"});
    await writeFile(resolve(outputDir, 'package.json'), JSON.stringify(packageJson));
    // 复制README
    await copyFile("README.md", resolve(outputDir, 'README.md'));
}

/**
 * 主进程
 */
async function main() {
    try {
        await beforeBuild();
        await esbuild.build(esbuildConfig);
        await afterBuild();
        logger.info("构建完成!")
        process.exit(0);
    } catch (e) {
        logger.error("构建失败!", e);
        process.exit(1);
    }
}

await main();
