import chalk from 'chalk';
import { createEnum } from './enum.js';

class LOGGER {
    _TypeBg = createEnum(['info', 'bgBlue'], ['warn', 'bgYellow'], ['error', 'bgRedBright']);
    _logo = (type) =>
        chalk.bgBlueBright(chalk.whiteBright(` utils `)) + chalk[this._TypeBg[type]](` ${type.toUpperCase()} `);
    isOn = true;

    constructor() {}

    /**
     * 开启
     */
    on() {
        this.isOn = true;
    }

    /**
     * 关闭
     */
    off() {
        this.isOn = false;
    }

    get forbidden() {
        return !this.isOn;
    }

    /**
     * 普通消息
     * @param messages
     */
    info(...messages) {
        if (this.forbidden) return;
        console.log(this._logo('info'), ...messages);
    }

    /**
     * 警告
     * @param messages
     */
    warn(...messages) {
        if (this.forbidden) return;
        console.log(this._logo('warn'), ...messages);
    }

    /**
     * 错误信息
     * @param messages
     */
    error(...messages) {
        if (this.forbidden) return;
        console.log(this._logo('error'), ...messages);
    }
}

export const logger = new LOGGER();
