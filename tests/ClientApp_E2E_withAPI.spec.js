//Author: Sumanth
import { test, expect, request } from '@playwright/test';


const loginpayload = { userEmail: "cbtcroud122@gmail.com", userPassword: "Test@123" };
const orderpayload = { orders: [{ country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3" }] }
let token;//this will be let so it allow to initilaizw later - Const should be initialize there only
let OrderId;
test.beforeAll(async () => {
  const apiContext = await request.newContext();//Create new API Context like Browser/page 
  //Create new Post Request (URL and Body)
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginpayload
    })
  expect(loginResponse.ok()).toBeTruthy(); // checking status is 200/201...
  const loginresponsejson = await loginResponse.json();//fetching and storing resoponse in JSON
  token = loginresponsejson.token; //fetching token from JSON
  console.log(token); // Print token


  //new APi Call - Order API Call and Getting order ID 
  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderpayload,
      //Header will be passes in Key value pair 
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
  const Orderresponsejson = await orderResponse.json();
  console.log(Orderresponsejson);
  OrderId = Orderresponsejson.orders[0];

});

//@API Tag 
test('@API client App E2E testing', async ({ page }) => {
  await page.addInitScript(tokenvalue => {
    //window.localStorage.setItem(key,value)
    window.localStorage.setItem('token', tokenvalue);
  }, token); // 'token' is a value that need to be set, it can be Authkey/Barera etc.. 
  // toenvalue is somethig that we have to set what we got from response so we are mapping token to tokenvalue  
  await page.goto('https://rahulshettyacademy.com/client/');

  //await page.pause();
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator('table').waitFor();

  const orderlist = page.locator("tbody tr");
  //const listcount = await orderlist.locator("th").count();

  for (let j = 0; j < await orderlist.count(); ++j) {

    const roworderId = await orderlist.nth(j).locator("th").textContent();
    if (OrderId.includes(roworderId)) { // here orginal order is writting some | | and space to avoid that we use Includes () method - it will look for substring 
      await orderlist.nth(j).locator("button").first().click();
      break;
    }
  }


});