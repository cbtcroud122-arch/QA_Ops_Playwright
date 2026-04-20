//const base = require("@playwright/test"); //Importing test mudule as baseTest (we can give any name base/test...)
import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
}

//to implement these input data we are defining the interface and then extending it from baseTest and implementing 
export const customTest = baseTest.extend<{testdatafororder:TestDataForOrder}>(
    {

        testdatafororder: {
            username: "cbtcroud122@gmail.com",
            password: "Test@123",
            productName: "ADIDAS ORIGINAL"
        }
    })