const { When, Then, Given } = require('@cucumber/cucumber');
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');// Here in cucumber we don't page instance so we are importing playwright here and it has a method 
//of browsers to launch from there we get browser context and then create context & page from there 


//Cucumber by default execute stepdefination in 5sec and it take more time then it well fail - so externall we can add timeout 
Given('login to the Application using {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

});

When('Enter Valid details and place the Order', async function () {

    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    // can be declare as let orderId:any; first then and use it or directly add any (id can be string/number/alphanumeric)
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify Order is present in the OrderHistory', async function () {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('login to the Ecommerce Application using {string} and {string}', { timeout: 100 * 1000 }, async function (userName, passWord) {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // navigate to URL
    const username = this.page.locator('#username');
    const password = this.page.locator("[type='password']");
    await username.fill(userName); // [id='username']
    await password.fill(passWord); // [id='password'] / Type = Password
    await this.page.locator('#signInBtn').click();
    
});

Then('Validate Error Message displayed', async function () {
    console.log(await this.page.locator("[style*='block']").textContent()); // * is regular expresion to handle dynamic - it will take partial value like contain textcontent() will get text from page 
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});