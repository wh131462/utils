#!/usr/bin/env node
import {program} from "commander";
import {logger} from "node-lib/common/logger";
import {setRoot} from "node-lib/common/root";
import {comfirm, inquire} from "node-lib/common/promot";
import {join} from "path"

const version = process.env.VERSION ?? "0.0.0";

program
    .version(version)
    .description(`A cli for utils.`)
    .allowUnknownOption() // 允许未知选项，以便我们可以捕获自定义命令
    .on('command:*', (cmd) => {
        logger.error(`Invalid command: ${cmd}`);
        process.exit(1);
    })
    .command('<feature>')
    .action(async (projectName) => {
        logger.info(`Starting create new feature.`);
        await setRoot()
        const featuresDir = join(process.cwd(), "lib", "features");
        if (!projectName) {
            projectName = await inquire("未指定新特性名称,请确定:")
        }
        const targetName = join(featuresDir, projectName)
        const isCreate = await comfirm(`是否确认创建${featuresDir}`);
        if (isCreate) {
            logger.info(`新特性创建完成,地址为:file://${targetName}`);
            process.exit(0);
        } else {
            logger.info("用户终止创建新特性.")
            process.exit(0);
        }

    });
