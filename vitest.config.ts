import {defineConfig} from 'vitest/config';

export default defineConfig({
    test: {
        include: ['**/*.spec.ts'],
        environment: 'happy-dom',
        typecheck: {
            enabled: true // 启用类型检查
        },
        setupFiles: ['./test/setup.ts'],
        coverage: {
            provider: 'v8', // 必须使用 v8
            enabled: true,
            reportsDirectory: './coverage',
            reporter: ['text', 'html', 'lcov'],
            include: ['src/**/*.ts'],
            exclude: [
                '**/*.d.ts',
                '**/types.ts'
            ]
        }
    }
});