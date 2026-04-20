const base = require("@playwright/test"); //Imposting base test mudule as base (we can give any name base/test...)

exports.customtest = base.test.extend(
    {

        testdatafororder: {
            "username": "cbtcroud122@gmail.com",
            "password": "Test@123",
            "productName": "ADIDAS ORIGINAL"
        }
    })