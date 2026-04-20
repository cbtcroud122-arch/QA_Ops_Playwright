const playwright = require('@playwright/test');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');


//Before execute once for each scenario
//Before All - Execute once before all scenarios
Before(async function () {
    //const browser = await playwright.chromium.launch();//This will run in default headless mode
    //to run in headmode use below line 
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext(); // New Session creation 
    this.page = await context.newPage()

    //here page as no life.. so to get that from here we declare const {playwright} from @playwright/test from here do 
    // const browser = await playwright.chromium.launch(); this will give browser instance from there get context and new Page 

    this.poManager = new POManager(this.page);
    // as Before is executing first it will be initailize globally, we need to worry about how this.POManager/Page is used in step definiation file from hokks file
});

BeforeStep(function () {
console.log("Before Step Line No code here moving to After Step");
});

AfterStep(async function ({result}) {
    if(result.status === Status.FAILED){
        await this.page.screenshot({ path: 'Screenshot.png' });
    }   
});

//After execute once for each scenario
//After All - Execute once After all scenarios

After(function () {
    // Assuming this.driver is a selenium webdriver
    console.log("I am the last step of the Execution");
});