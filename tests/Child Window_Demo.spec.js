import {test,expect} from '@playwright/test'

test('child Window Test', async ({browser})=>{
//here we are taking browser fixture as child windoe is gonna open in new page so we need context of that new page /session  
const context = await browser.newContext(); 
const page = await context.newPage();

const documentlink = page.locator("[href*='documents-request']");
const username = page.locator("#username");

await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

//As this click and wait for event should execute parallel/asyncronasly to get page details we have to use Promise.all()
//Once both the Promises are fulfilled then [newpage] will have a control on child page  
const [newpage] = await Promise.all([context.waitForEvent('page'),documentlink.click()])

const expectedtextfiled = newpage.locator(".red");
const arraytext = await expectedtextfiled.textContent();
const text = arraytext.split("@");
const domain = text[1].split(" ")[0]
console.log(domain);
await username.fill(domain);
//await page.pause(); // To get the Debug page - kind of break point test will paus and we can go over step by step or validate anything 
//await username.textContent(); //this won't work as this applies only for Elements attached to DOM not for runtime entries 
console.log(await username.inputValue()); //this method is to get the text values which is passed at runtime 
});