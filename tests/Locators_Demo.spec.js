import {test} from '@playwright/test';
import { text } from 'node:stream/consumers';

test('Different Types of Locators', async({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.locator("input.form-control[name='name']").fill('Sumanth');
    await page.locator("[name='email']").fill('test@tet.com');
    await page.getByPlaceholder("Password").fill('123456');
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel('Gender').selectOption('Female');// Get By Label can be used along with <Select> Dropdownn as well
    await page.getByLabel('Employed').check();
    await page.getByRole('button',{name :'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name:'Shop'}).click();

    await page.locator("app-card").filter({hasText:'Nokia Edge'}).getByRole('button').click();


})

