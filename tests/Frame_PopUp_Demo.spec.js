import {test,expect} from '@playwright/test'

test('Frames and Pop-Up Test', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    //await page.goto("https://www.google.com"); //Open Gogole within same session / window 
    //await page.goBack();//Navigate back
    //await page.goForward();//navigate forword

    await expect(page.locator("#displayed-text")).toBeVisible(); // Check it is Visible 
    await page.locator("#hide-textbox").click(); //Click hide
    await expect(page.locator("#displayed-text")).toBeHidden(); //Check it is Hidden 

    page.on('dialog', dialog=>dialog.accept()); //Accept / Dismiss --> This line need to be called before performing action
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover(); //Do Mouse Hover 

    const framepage =  page.frameLocator("#courses-iframe");
    await framepage.locator("li a[href*='lifetime-access']:visible").click();//if we have any invisible frames we can just ignore by adding "":Visible" along with locator 

    const text = await framepage.locator(".text h2").textContent();
    console.log(text.split(" ")[1]);

});