// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
//export default defineConfig({//this is default coming in project we can modify this as well 
//we can assign all the config to const variable and export that to all modules so we can use it across project 
export const config = ({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  retries: 1,
  timeout: 30*1000, // *1000 in millisec - 40sec 
  expect:{ // For Assertion timeouts use expect
     timeout: 30*1000
  },
  reporter: 'html', // to get html report
  use: {
    browser : "chromium",
    headless : false,
    screenshot : 'on',
    trace : 'on', //on or off //trace : 'retain-on-failuer', to capture only on failuer
  },
});

module.exports = config // This line we have to call to export this config across project
