import {test,expect} from '@playwright/test';

test('@Web client App E2E testing', async({page})=>{


let userName = page.getByPlaceholder("email@example.com");
let password = page.getByPlaceholder("enter your passsword"); 
let signBtn = page.getByRole("button",{name:"Login"})
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
await cardBody.filter({hasText:ProductName}).getByRole("button",{name:"Add To Cart"}).click();
await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();//click on cart 

await page.locator("div li").first().waitFor(); // wait till cart page loads 

await expect(page.getByText("ADIDAS ORIGINAL")).toBeVisible();
//as selected item is getting added at last always 
// if there are multiple items in card it will select latest one added in last 
await page.locator("div li").getByRole("button",{name:"Buy Now"}).click();

let checkoutemail = await page.locator('div label').textContent();
console.log(checkoutemail);
await expect(page.locator('div label')).toHaveText(emailid);

await page.getByPlaceholder("Select Country").pressSequentially("ind",{dely:150});
const sugesstionlist = page.locator('.ta-results');
await sugesstionlist.waitFor();
await sugesstionlist.getByRole("button",{name:'India'}).nth(1).click();

//await expect(page.getByLabel("cbtcroud122@gmail.com")).toBeVisible();
await page.getByText("PLACE ORDER").click();

await expect(page.getByText(' Thankyou for the order. ')).toBeVisible();
await expect(page.getByText('ADIDAS ORIGINAL')).toBeVisible();

const oldorderid = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
console.log(oldorderid);
const parts = oldorderid.trim().split('|').map(p => p.trim()); //Splitting the white space and | from order id 
const neworderId = parts[1];  // '69d0c00cf86ba51a65459ffb'
console.log(neworderId);

await page.getByRole("listitem").getByRole("button",{name:"ORDERS"}).click();

await page.locator('table').waitFor();

const orderlist = page.locator("tbody tr");
//const listcount = await orderlist.locator("th").count();

const rowid = orderlist.locator("th").filter({hasText:neworderId}).textContent();
 expect(neworderId.includes(rowid));
 await orderlist.getByRole("button",{name:'View'}).first().click(); //Clicking on first view button as new orderid is getting added first 
// - Need to work on clicking based on Specific order id 
//await orderlist.locator("th").filter({hasText:neworderId}).getByRole("button",{name:"View"}).click();

await expect(page.getByText(neworderId)).toBeVisible();

await expect(page.getByText('ADIDAS ORIGINAL')).toBeVisible();

await page.getByRole("listitem").getByRole("button",{name:"Sign Out"}).click();
});