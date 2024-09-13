import {SafeJson} from "../safe-json";

/**
 * 输出美化日志
 * @example
 * Logger.info("这是一条日志", {a:1},[0]);
 * Logger.warn("这是一条日志", {a:1},[0]);
 * Logger.error("这是一条日志", {a:1},[0]);
 * Logger.debug("这是一条日志", {a:1},[0]);
 */
type LoggerType = 'info' | 'warn' | 'error' | 'debug';

export class Logger {
    static _logoStyle = (bgColor = '#000000', color = '#FFFFFF') => {
        return `padding:4px 8px;background: ${bgColor};color: ${color};border-radius: 4px 0 0 4px;`;
    };
    static _timeStyle = `padding:4px 8px;background: #333;color: #FFF;border-radius: 0 4px 4px 0;`;
    static _textStyle = `color: #333; font-weight: bold;text-indent:.618em;`;

    static LogoColors: Record<LoggerType, string> = {
        info: '#0000FF',
        warn: '#FFFF00',
        error: '#FF0000',
        debug: '#000000'
    };

    static _log(type: LoggerType, ...messages: any[]) {
        const [message,...others] = messages;
        console.log(`%c${type.toUpperCase()}%c${new Date().toLocaleTimeString()}%c${SafeJson.stringify(message)}`, Logger._logoStyle(Logger.LogoColors[type]), Logger._timeStyle, Logger._textStyle,...others);
    }

    /**
     * info
     * @param messages
     */
    static info(...messages: any[]) {
        Logger._log('info', ...messages);
    }

    /**
     * warn
     * @param messages
     */
    static warn(...messages: any[]) {
        Logger._log('warn', ...messages);
    }

    /**
     * error
     * @param messages
     */
    static error(...messages: any[]) {
        Logger._log('error', ...messages);
    }

    /**
     * debug
     * @param messages
     */
    static debug(...messages: any[]) {
        Logger._log('debug', ...messages);
    }
}
