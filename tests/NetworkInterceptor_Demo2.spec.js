import { test, expect } from '@playwright/test'

test('Network Interceptior', async ({ page }) => {

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
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6"}));
        // continue with wrong order id 

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

});