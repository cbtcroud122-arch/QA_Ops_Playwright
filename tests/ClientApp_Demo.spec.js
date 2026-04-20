//const{test,expect} = require('@playwright/test');
import {test,expect} from '@playwright/test'; // This also works 


//test.describe.configure({mode:'parallel'});//This will execure the below two tests in parallel 
//test.describe.configure({mode:'serial'});// This will run in serial mode but if any test failes then will skip all the remaining tests and save time
test('@Web Client Login test', async({page}) => {

   await page.goto('https://rahulshettyacademy.com/client');
   
   const username = page.locator('#userEmail');
   const password = page.locator("[placeholder= 'enter your passsword']");
   const login = page.locator("[value= 'Login']");
   const cardlist = page.locator('.card-body b');//Parent child element in CSS '.card-body' = parent 'space' and 'b' where text lies 

   await username.fill('cbtcroud122@gmail.com');
   await password.fill('Test@123');
   await login.click();

   //await page.waitForLoadState('networkidle')//this is not working - suggest to use other types by playwright community 
   await cardlist.first().waitFor(); //works only for Unique element 
   let cardslist = await cardlist.allTextContents(); 
   console.log(cardslist);//output =[ 'ADIDAS ORIGINAL', 'ZARA COAT 3', 'IPHONE 13 PRO' ]
   console.log(await cardlist.first().allInnerTexts());//output =[ 'ADIDAS ORIGINAL' ]

});

test('@Web Radio,Checkbox,Select Validation', async({page})=>{

   let documentlink = page.locator("[href*='documents-request']")
await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // navigate to URL
await page.locator('select.form-control').selectOption('Consultant');
await page.locator('.radiotextsty').last().click();
await page.locator('#okayBtn').click()
await page.locator('#terms').check();
await expect(page.locator('#terms')).toBeChecked(); // Validating it is checked 
await page.locator('#terms').uncheck();
expect(await page.locator('#terms').isChecked()).toBeFalsy(); //other way of assertion to validate is Unchecked as there is method to validate uncheked 

await expect (documentlink).toHaveAttribute("class","blinkingText");
//await documentlink.click();
});