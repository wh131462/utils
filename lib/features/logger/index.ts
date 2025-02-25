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
    static get isDarkMode() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    static _logoStyle = (bgColor = '#000000', color = '#FFFFFF') => {
        return `padding:4px 8px;background: ${bgColor};color: ${color};border-radius: 4px 0 0 4px;`;
    };
    static _timeStyle = `padding:4px 8px;background: #333;color: #FFF;border-radius: 0 4px 4px 0;`;
    static _textStyle = `color: ${Logger.isDarkMode ? '#FFF' : '#333'}; font-weight: bold;text-indent:.618em;`;

    static LogoColors: Record<LoggerType, string> = {
        info: '#0000FF',
        warn: '#FFFF00',
        error: '#FF0000',
        debug: '#000000'
    };
    private static _formatTime(date: Date): string {
        // 分解日期各部分并补零
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始需+1
        const day = date.getDate().toString().padStart(2, '0');
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const milliseconds = date.getMilliseconds().toString().padStart(3, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} ${milliseconds}`;
    }

    static _log(type: LoggerType, ...messages: any[]) {
        const [message, ...others] = messages;
        const hasMessage = typeof message === 'string';
        if (!hasMessage) {
            others.unshift(message);
        }
        console.log(`%c${type.toUpperCase()}%c${Logger._formatTime(new Date())}%c${hasMessage ? message : ''}`, Logger._logoStyle(Logger.LogoColors[type]), Logger._timeStyle, Logger._textStyle, ...others);
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
