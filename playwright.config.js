import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:43123',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'Desktop Chrome',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 800 }
      },
    },
    {
      name: 'Mobile Viewport (Pixel 5)',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 },
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'Mobile Viewport (iPhone 13 - Chromium)',
      use: {
        viewport: { width: 390, height: 844 },
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
        isMobile: true,
        hasTouch: true,
      },
    },
    {
      name: 'Tablet Viewport (iPad)',
      use: {
        viewport: { width: 820, height: 1180 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 43123',
    url: 'http://127.0.0.1:43123',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
