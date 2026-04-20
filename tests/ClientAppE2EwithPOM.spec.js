const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageobjects/POManager');//../ is used to come out of current folder 

//Convert JSON --> String --> Object to avoid any UFT-8 kind of encoding issues 
const dataset = JSON.parse(JSON.stringify(require("../Utils/TestData.json"))); // Test data driving by JSON file (TestData.JSON)

const { customtest } = require("../Utils/test-base"); //importing custome fixture 

for (const data of dataset) { // to run with multiple data // 1 way 
  // add multiple data in JSON file as an array using [] - for single data just remove array and keep one set 

  //Pasisng Data using JSON File (Single and Multiple set of data) 
  test(` @Web Client App login for ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();


  });
}

//passing custom fixture "testdatafororder" here in trhis test 

//Customtest name should be same what we given in test-base.js - it shoud match with what we extend from that base file
customtest('Passing data using Fixture Example', async ({ page, testdatafororder }) => {
  const poManager = new POManager(page);

  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(testdatafororder.username, testdatafororder.password); //calling data using fixure 
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testdatafororder.productName);
  await dashboardPage.navigateToCart();

  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testdatafororder.productName);
  await cartPage.Checkout();
})