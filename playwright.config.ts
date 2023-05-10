// @ts-ignore
import {defineConfig, devices} from '@playwright/test';

require('dotenv').config();

export default defineConfig({

    reporter: [['list'], ['html', {open: 'never'}]],
    // retries: 1,
    fullyParallel: true,
    testDir: './tests',
    timeout: 30 * 10000,
    expect: {
        timeout: 30 * 1000,
    },
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    use: {
        headless: true,
        actionTimeout: 30 * 1000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure',
        baseURL: 'https://reqres.in'
    },
    projects: [
        {
            name: 'ExecuteInChrome',
            testDir: './tests/e2e',
            use: {
                ...devices['Desktop Chrome'],
                viewport: {width: 1920, height: 1080},
            },
        },
        {
            name: 'Integration',
            testDir: './tests/integration',
        },
        {
            name: 'ExecuteInFirefox',
            testDir: './tests/e2e',
            use: {
                ...devices['Desktop Firefox'],
                viewport: {width: 1920, height: 1080},
            },
        },
        {
            name: 'ExecuteInWebkit',
            testDir: './tests/e2e',
            use: {
                ...devices['Desktop Safari'],
                viewport: {width: 1920, height: 1080},
            },
        },
        {
            name: 'Mobile_Safari',
            testDir: './tests/e2e',
            use: {...devices['iPhone 13 Pro Max']},
        },
    ],
    /* Folder for test artifacts such as screenshots, videos, traces, etc. */
    outputDir: 'test-results/',
    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   port: 3000,
    // },
});
