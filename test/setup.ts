import { vi } from 'vitest';

// 模拟 matchMedia
Object.defineProperty(window, 'matchMedia', {
    value: (query: string) => ({
        matches: query.includes('dark'),
        addListener: vi.fn(),
        removeListener: vi.fn()
    }),
    writable: true
});