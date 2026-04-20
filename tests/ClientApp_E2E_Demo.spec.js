import {test,expect} from '@playwright/test';

//@Web tag
test('@Web client App E2E testing', async({page})=>{


let userName = page.locator("#userEmail");
let password = page.locator("#userPassword"); 
let signBtn = page.locator("[value='Login']");   
let emailid = 'cbtcroud122@gmail.com';
let ProductName = "ADIDAS ORIGINAL";
let Selectcountry = " India";
let cardBody = page.locator(".card-body");

await page.goto('https://rahulshettyacademy.com/client/');
await userName.fill(emailid);
await password.fill("Test@123");
await signBtn.click();

await cardBody.first().waitFor(); // wait till page load 

let productslistcount = await cardBody.count();

//Iterate over each product and validate name is matching with required product if matching then click on Add to cart 
//Dynamic handling within Product list - will work for any product 
for(let i=0;i<productslistcount;++i){
    
    if(await cardBody.nth(i).locator("b").textContent() === ProductName){
        await cardBody.nth(i).locator("text= Add To Cart").click();
        break;
    }
}
await page.locator("[routerlink*='cart']").click();//click on cart 

await page.locator("div li").first().waitFor(); // wait till cart page loads 

const bool = await page.locator("div li").locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
expect(bool).toBeTruthy();
await page.locator("div li").locator("button:has-text('Buy Now')").last().click();//as selected item is getting added at last always 
// if there are multiple items in card it will select latest one added in last 

let checkoutemail = await page.locator('div label').textContent();
console.log(checkoutemail);
await expect(page.locator('div label')).toHaveText(emailid);

await page.locator('[placeholder="Select Country"]').pressSequentially('ind',{delay:150});
const sugesstionlist = page.locator('.ta-results');
await sugesstionlist.waitFor();
const optioncount = await sugesstionlist.locator("button").count();

for(let k = 0;k<optioncount;++k){
    if(await sugesstionlist.locator("button").nth(k).textContent() === Selectcountry){
        await sugesstionlist.locator("button").nth(k).click();
        break;
    }
}

await expect(page.locator(".user__name [type='text']").first()).toHaveText(emailid);
await page.locator(".action__submit").click();

await expect(page.locator(".hero-primary")).toHaveText(' Thankyou for the order. ');

await expect(page.locator("tr .line-item div:has-text('ADIDAS ORIGINAL')")).toHaveText(ProductName);


const orderid = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
console.log(orderid);
await page.locator("button[routerlink*='myorders']").click();
await page.locator('table').waitFor();

const orderlist = page.locator("tbody tr");
//const listcount = await orderlist.locator("th").count();


for(let j=0;j< await orderlist.count();++j ){

const roworderId = await orderlist.nth(j).locator("th").textContent();
    if(orderid.includes(roworderId)){ // here orginal order is writting some | | and space to avoid that we use Includes () method - it will look for substring 
    await orderlist.nth(j).locator("button").first().click();
    break;
    }
}

const orderiddetails = await page.locator(".col-text").textContent();
expect(orderid.includes(orderiddetails)).toBeTruthy();
await expect(page.locator(".title")).toHaveText(ProductName);
await page.locator("button:has-text('Sign Out')").click()

});