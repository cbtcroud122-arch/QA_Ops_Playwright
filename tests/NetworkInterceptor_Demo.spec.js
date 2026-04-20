import { test, expect, request } from '@playwright/test';
//import { APiUtils } from './Utils/APiUtils';
const { APiUtils } = require('../Utils/APiUtils');

const loginpayload = { userEmail: "cbtcroud122@gmail.com", userPassword: "Test@123" };
const orderpayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }
const fakeorderPayload = { data: [], message: "No Orders" };// What we are intercepting in the middle 

//here we need token and orderid which is creating in APiUtils class but not coming here for that create object in utils class and store it there from there access here 
//let token;
//let OrderId;
let response;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APiUtils(apiContext, loginpayload);
  response = await apiUtils.createOrder(orderpayload); // This Method is returning responseobject so storing as response and use it where needed 
});


test('@API Place Order', async ({ page }) => {

  await page.addInitScript(tokenvalue => {//window.localStorage.setItem(key,value)
    window.localStorage.setItem('token', tokenvalue);
  }, response.token); // 'token' is a value that need to be set, it can be Authkey/Barera etc.. 
  // toenvalue is somethig that we have to set what we got from response so we are mapping token to tokenvalue  

//tokenvalue is function what i am calling and to set the 'Token" which is present in 
// window.locatol.storage do setItem(token - key, tokenvalue = value --> that i am giving as )response.token

  await page.goto('https://rahulshettyacademy.com/client/');

  //https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69ceb2a0f86ba51a6541b956 
  // here Order id is hardcoded to avoid & make it generic useing regular expression *
  await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async route => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakeorderPayload);// converting Javascript object to JSON Format 
      route.fulfill(
        {
          response,
          body,
        });
        //Intercepting response: API Response --> Browser --> Rendring in to UI Page - Actual Flow 
        // Intercepting response we are injecting --> APi Response --> Browser --> {Fake Response Inject by Playwright}--> Rendring in to UI 
    });
    
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")//wait till this API Response is generated 
  console.log(await page.locator(".mt-4").textContent());


});