const {test,expect} = require('@playwright/test'); // Need test to create test and expect for validation - getting both from here

test('Broser context playwright test', async ({browser})=> //browser is Fixture (we can have multiple like {browser,page})
{
    const context = await browser.newContext(); // New Session creation 
    const page = await context.newPage(); // New page within the session

    //We can stor Elements in variable as well like this 
    const username = page.locator('#username');
    const password = page.locator("[type='password']");
    const cartItems = page.locator('.card-body a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); // navigate to URL

    await username.fill('Sumanth'); // [id='username']
    await password.fill('testpass'); // [id='password'] / Type = Password
    await page.locator('#signInBtn').click();
    console.log(await page.locator("[style*='block']").textContent()); // * is regular expresion to handle dynamic - it will take partial value like contain textcontent() will get text from page 
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //Enter valid UN and PW and Navigate to get the text of products 

    //adding thil line to clear the UN text filed - we use fill method only in playwright 
    await username.fill(' ');
    await username.fill('rahulshettyacademy');
    await password.fill(' ');
    await password.fill('Learning@830$3mK2');
    await page.locator('#signInBtn').click();
    //console.log(await page.locator('.card-body a').textContent()) // .card-body a here .car-body is class and a is child element (link) we have to give space between parent & Child 
//above line will return error as Error: locator.textContent: Error: strict mode violation: locator('.card-body a') resolved to 4 elements:
//to access elements we can use methods like first()/last()/nth(indiex)

    //console.log(await cartItems.first().textContent())
    //console.log(await cartItems.last().textContent())
    //console.log(await cartItems.nth(2).textContent())

    //console.log((await cartItems.allTextContents())); // if we pass above 3 lines this will result in empty arry as alltextContents method is not part of Auto Wait mechanisum

    //Print the text of all the matching elements 
    //await page.waitForLoadState('networkidle'); // this is not working now not suggested by Playwright community to handle wait insted use this 
    //await cartItems.waitFor();//this will work only with locator matching with one element not for multiple element and argument is optional 
    
    await cartItems.first().waitFor(); //simply put first()/last()/nth(index) and make it unique
    console.log((await cartItems.allTextContents()));// output = [ 'iphone X', 'Samsung Note 8', 'Nokia Edge', 'Blackberry' ]
});



test('Playwright page test', async({page})=>{ //page is a fixture 
//test.only - execute only this particular test
    await page.goto('https://www.google.com/');
    console.log(page.title()) // get the title of the page
    await expect(page).toHaveTitle('Google')


});
