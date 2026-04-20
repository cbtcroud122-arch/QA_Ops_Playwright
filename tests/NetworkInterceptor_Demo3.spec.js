const { test, expect } = require('@playwright/test'); // Need test to create test and expect for validation - getting both from here

test('Browser context playwright test', async ({ browser }) => //browser is Fixture (we can have multiple like {browser,page})
{
    const context = await browser.newContext(); // New Session creation 
    const page = await context.newPage(); // New page within the session

    //We can stor Elements in variable as well like this 
    const username = page.locator('#username');
    const password = page.locator("[type='password']");

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // navigate to URL

    //Intercepting here to abort Image details calls - once the screen is opened user won't see any images 
    //Server down scenarios
    await page.route("**/*.{jpg,png,jpeg}", route => route.abort());

    await username.fill('Sumanth'); // [id='username']
    await password.fill('testpass'); // [id='password'] / Type = Password
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent()); // * is regular expresion to handle dynamic - it will take partial value like contain textcontent() will get text from page 
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    await page.screenshot({ path: 'PageScreenshot.png' });//Page level screenshot

    //Enter valid UN and PW and Navigate to get the text of products 
    //adding thil line to clear the UN text filed - we use fill method only in playwright 
    await username.fill(' ');
    await username.fill('rahulshettyacademy');
    await password.fill(' ');
    await password.fill('Learning@830$3mK2');
    await page.locator('#signInBtn').click();
    await page.locator('#signInBtn').screenshot({ path: 'ElementScreenshot.png' })

    // to print all the request and response details that playwright keep track during whole execution in console 
    page.on('request', request => console.log(request.url()))
    page.on('response', response => console.log(response.url(), response.status()))
    await page.locator('.card-body a').first().waitFor(); //simply put first()/last()/nth(index) and make it unique
    console.log((await page.locator('.card-body a').allTextContents()));// output = [ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]

});

test('@Web Visual Tetsing ', async ({ page }) => {

    //await page.goto("https://rahulshettyacademy.com/practice",{ waitUntil: 'load' }); // some date / image missmatch fail 
    await page.goto("https://www.Google.com"); // Image will match and it will pass (First run will fail if there is no expected image and create it)
    expect(await page.screenshot()).toMatchSnapshot('landing.png');
});
