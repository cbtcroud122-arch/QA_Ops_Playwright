//const { expect } = require("@playwright/test");
import {Page,Locator,expect} from '@playwright/test';

export class OrdersReviewPage
{
    page:Page;
    country:Locator;
    dropdown:Locator;
    emailId:Locator;
    submit:Locator;
    orderConfirmationText:Locator;
    orderId:Locator;

constructor(page:Page) // this page just belong to this block, to access across the class declare and initialize as this.page = page
{
this.page = page;
this.country = page.locator("[placeholder*='Country']");
this.dropdown = page.locator(".ta-results");
this.emailId = page.locator(".user__name [type='text']").first();
this.submit =  page.locator(".action__submit");
this.orderConfirmationText = page.locator(".hero-primary");
this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");

}
async searchCountryAndSelect(countryCode:string,countryName:string)
{
    let delay:number;
    await this.country.pressSequentially(countryCode,{delay:100});//we can use 
    await this.dropdown.waitFor();
    const optionsCount = await this.dropdown.locator("button").count();
    for(let i =0;i< optionsCount; ++i)
    {
        // here adding any as it is suggesting what if text null so string can't handle declare as any 
      const  text:any =  await this.dropdown.locator("button").nth(i).textContent(); 
        if(text.trim() === countryName)
        {
           await this.dropdown.locator("button").nth(i).click();
           break;
        }
    }

}

async VerifyEmailId(username:string)
{
    await expect(this.emailId).toHaveText(username);
}

async SubmitAndGetOrderId()
{
 await this.submit.click();
 await expect(this.orderConfirmationText).toHaveText(" Thankyou for the order. ");
 return await this.orderId.textContent();
}
}
module.exports = {OrdersReviewPage};
   