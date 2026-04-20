//for Typescript we have to use Import not require (this is for Javascript)
import { test, expect, request } from '@playwright/test';
import { APiUtils } from '../Utils_TypeScript/APiUtils';


//Just giving type as any so it can take request (request be anything so using any)
const loginpayload:any = { userEmail: "cbtcroud122@gmail.com", userPassword: "Test@123" };
const orderpayload:any = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }

//here we need token and orderid which is creating in APiUtils class but not coming here for that create object in utils class and store it there from there access here 
//let token;
//let OrderId;
let response:any;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginpayload);
  response = await apiUtils.createOrder(orderpayload); // This Method is returning responseobject so storing as response and use it where needed 
});

//@API can be used a tag 
test('@API Place Order', async ({ page }) => {
  await page.addInitScript(tokenvalue => {//window.localStorage.setItem(key,value
    window.localStorage.setItem('token', tokenvalue);
  }, response.token); // 'token' is a value that need to be set, it can be Authkey/Barera etc.. 
  // toenvalue is somethig that we have to set what we got from response so we are mapping token to tokenvalue  
  await page.goto('https://rahulshettyacademy.com/client/');

  await page.locator(".card-body").first().waitFor();
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('table').waitFor();

  const orderlist = page.locator("tbody tr");
  //const listcount = await orderlist.locator("th").count();

  for (let j = 0; j < await orderlist.count(); ++j) {

    const roworderId = await orderlist.nth(j).locator("th").textContent();
    if (await response.OrderId.includes(roworderId)) { // here orginal order is writting some | | and space to avoid that we use Includes () method - it will look for substring 
      await orderlist.nth(j).locator("button").first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text").textContent();
  //await page.pause();
  expect(response.OrderId.includes(orderIdDetails)).toBeTruthy();

});