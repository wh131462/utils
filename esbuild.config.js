import {resolve} from 'node:path';
import {copyFile, rm, writeFile} from 'node:fs/promises';
import esbuild from 'esbuild';
import {readFileSync} from "node:fs";
import {logger} from "./node-lib/common/logger.js";
import {glob} from "glob";

const outputDir = 'dist';
const entries = glob.sync("lib/**/*.ts");
export const esbuildConfig = {
    entryPoints: entries, // 入口文件
    bundle: false,                 // 是否将所有依赖打包到一个文件
    splitting: true,
    outdir: `${outputDir}/lib`,    // 输出的目录
    outbase: 'lib',                // 保持输出目录结构与 lib 一致
    platform: 'node',              // 或 'browser'，根据你的环境选择
    sourcemap: true,               // 生成 sourcemap 文件，方便调试
    minify: true,                  // 是否压缩输出文件
    target: ['es2020'],
    format: 'esm',
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
    Object.assign(packageJson, {
        main: "lib/main.js",
        types: "types/main.d.ts"
    });
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
        logger.info("JS代码构建完成!")
        process.exit(0);
    } catch (e) {
        logger.error("构建失败!", e);
        process.exit(1);
    }
}

await main();
