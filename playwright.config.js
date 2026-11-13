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
  use: { 
    browserName: 'webkit', 
    headless: false,
    screenshot: 'on', //on, off, only-on-failure
    video:'retain-on-failure',      //on, off, retain-on-failure, on-first-retry
    trace: 'on',      //on,off,retain-on-failure
//in viewport we decide in which height and width browser will open    
    // viewport: {width:720,height:1020}
//in devices: we provide device name and playwright's duty to open browser in that mode
    // ...devices['iPhone 11'],
//ssl cerification error handling
    ignoreHTTPSErrors:true,
// allow permission of location camera to allow
    permissions:['geolocation'],
    
  },
});
// npx allure generate ./allure-results --clean -o ./allure-report
// allure report : http://127.0.0.1:54682/#behaviors/b1a8273437954620fa374b796ffaacdd/5b1685cbb3e323e8/