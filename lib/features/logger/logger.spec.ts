import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {Logger} from './index';

describe('Logger 基础功能测试', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>;
    const mockDate = new Date(2023, 0, 1, 12, 30, 45, 123);

    beforeEach(() => {
        // 模拟固定时间
        vi.useFakeTimers().setSystemTime(mockDate);

        // 捕获 console.log
        consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {
        });

        // 强制暗黑模式
        Object.defineProperty(Logger, 'isDarkMode', {
            get: () => true
        });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
        vi.useRealTimers();
    });

    // 测试颜色配置
    it('应正确配置颜色', () => {
        expect(Logger.LogoColors).toEqual({
            info: '#0000FF',
            warn: '#FFFF00',
            error: '#FF0000',
            debug: '#000000'
        });
    });

    // 测试各日志方法
    const testCases: Array<[keyof typeof Logger.LogoColors, string]> = [
        ['info', '#0000FF'],
        ['warn', '#FFFF00'],
        ['error', '#FF0000'],
        ['debug', '#000000']
    ];

    testCases.forEach(([level, color]) => {
        it(`${level} 方法应正确调用`, () => {
            Logger[level](`${level} message`);
            const expectedStyle = `background: ${color};color: #FFFFFF;`;

            expect(consoleSpy).toHaveBeenCalledWith(
                `%c${level.toUpperCase()}%c2023-01-01 12:30:45 123%c${level} message`,
                expect.stringContaining(expectedStyle),
                expect.any(String),
                expect.any(String)
            );
        });
    });

    // 测试暗黑模式
    it('暗黑模式应使用白色文字', () => {
        expect(Logger._textStyle).toMatch(/color: #FFF/);
    });
});