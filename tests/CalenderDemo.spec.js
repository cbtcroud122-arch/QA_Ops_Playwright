const{test,expect} =  require('@playwright/test');

test('@Web Calender Handling test',async ({page})=>{

    const month = "8";
    const date = "26";
    const year = "1996";
    const expectlist= [month,date,year];

    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    await page.locator(".react-calendar__navigation__label").click();
    
    await page.locator(".react-calendar__navigation__prev-button").click();
    //page.pause();
    await page.locator("button").filter({hasText:'1991 – 2000'}).click();
   // await page.locator(".react-calendar__century-view__decades__decade span").filter({hasText:'1991 – 2000'}).click();
    await page.locator(".react-calendar__decade-view__years__year").getByText(year).click();

    await page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();

 const picker = page.locator(".react-date-picker__inputGroup input");

 for(let i=0;i<expectlist.length;i++){
    const value = picker.nth(i).inputValue();
    expect(value).toEqual(expectlist[i]);
 }
//Just adding this line to validate git push to sub branch and test GIT Actions triggering test automatically on Pull request creation5
});