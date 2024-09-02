#!/usr/bin/env node
import {program} from "commander";
import {logger} from "#node-lib/common/logger.js";
import {setRoot} from "#node-lib/common/root.js";
import {comfirm, inquire} from "#node-lib/common/promot.js";
import {join} from "path";
import {mkdirSync, writeFileSync, existsSync, appendFileSync} from "fs";

const version = process.env.VERSION ?? "0.0.0";

program
    .version(version)
    .description(`A cli for utils.`)
    .allowUnknownOption()
    .on('command:*', (cmd) => {
        logger.error(`Invalid command: ${cmd}`);
        process.exit(1);
    })
    .command('feature <projectName>')
    .action(async (projectName) => {
        logger.info(`Starting create new feature.`);
        await setRoot()

        const featuresDir = join(process.cwd(), "lib", "features");
        if (!projectName) {
            projectName = await inquire("未指定新特性名称,请确定:")
        }

        const targetDir = join(featuresDir, projectName);
        const indexPath = join(targetDir, "index.ts");

        // 确认创建新特性
        const isCreate = await comfirm(`是否确认创建 ${targetDir}?`);
        if (isCreate) {
            // 检查目录是否存在
            if (!existsSync(targetDir)) {
                mkdirSync(targetDir, { recursive: true });
                logger.info(`创建目录: ${targetDir}`);
            } else {
                logger.warn(`目录已存在: ${targetDir}`);
            }

            // 创建 index.ts 文件
            if (!existsSync(indexPath)) {
                writeFileSync(indexPath, `// ${projectName} index.ts\n`);
                logger.info(`创建文件: ${indexPath}`);
            } else {
                logger.warn(`文件已存在: ${indexPath}`);
            }

            // 更新 lib/main.ts 文件
            const mainFile = join(process.cwd(), "lib", "main.ts");
            const exportStatement = `export * from './features/${projectName}';\n`;

            if (!existsSync(mainFile)) {
                writeFileSync(mainFile, exportStatement);
                logger.info(`创建 main.ts 并导出新特性: ${projectName}`);
            } else {
                appendFileSync(mainFile, exportStatement);
                logger.info(`更新 main.ts 并导出新特性: ${projectName}`);
            }

            logger.info(`新特性创建完成, 地址为: file://${targetDir}`);
            process.exit(0);
        } else {
            logger.info("用户终止创建新特性.");
            process.exit(0);
        }
    });

program.parse(process.argv);
