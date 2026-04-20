// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { permission } from 'node:process';

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
  retries: 1,   // If any test fail then it will retry again one time.. it can be 5/10/100... 
  workers: 3,// telling playwright to run in 3 instance parallely (default is 5 but we can modify like this)
  timeout: 30 * 1000, // *1000 in millisec - 40sec 
  expect: { // For Assertion timeouts use expect
    timeout: 30 * 1000
  },
  reporter: 'html', // to get html report
  projects: [ // This is used to configures multiple Project / Configuration to run the tests.. can be used for cross browser testing 
    {
      name: 'Chrome tests',
      use: {
        browser: "chromium",
        headless: false,
        screenshot: 'on',
        video: 'retain-on-failuer',//to record videos we use video property - Refer Playwright doc for more options 
        ignoreHttpsError: true, // this is to handle SSL certification error and launch the browsers 
        Permissions: ['geolocation'], // Sometime Chrome will ask for Allow location popup - this property will allow then and continue the execution
        trace: 'on', //on or off //trace : 'retain-on-failuer', to capture only on failuer
        //viewport: {width:720, height:720} // View Port is used to at what resolution / size the window should open for test run - User defined 
        ...devices['iPhone 15 Plus'],// this will used to emulate the screen as Mobile devices or any diff window devices 

      }
    },
    {
      name: "Safari test",
      use: {
        browser: "webkit",
        headless: false,
        screenshot: 'on',
        trace: 'on', //on or off //trace : 'retain-on-failuer', to capture only on failuer

      },
    }
  ]
});

module.exports = config // This line we have to call to export this config across project
