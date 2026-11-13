// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { on } from 'node:cluster';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  retries:2,
  fullyParallel: true,
  workers: 3,
  timeout: 40 * 1000 ,
  expect: { timeout:5000,},
  reporter: 'html',

  projects: [
    {
      name: 'chrome',
        use: { 
              browserName: 'chromium', 
              headless: false,
              screenshot: 'on',
              trace: 'on', //on,off,retain-on-failure
              },
    },
    {
      name: 'firefox',
        use: { 
              browserName: 'firefox', 
              headless: false,
              screenshot: 'on',
              trace: 'on', //on,off,retain-on-failure
              },
    },
    {
      name: 'safari',
        use: { 
              browserName: 'webkit', 
              headless: false,
              screenshot: 'on',
              trace: 'on', //on,off,retain-on-failure
              },
    },
  ]
  
});
