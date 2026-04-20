//const {LoginPage} = require('./LoginPage');
//const {DashboardPage} = require('./DashboardPage');
//const {OrdersHistoryPage} = require('./OrdersHistoryPage');
//const {OrdersReviewPage} = require('./OrdersReviewPage');
//const {CartPage} = require('./CartPage');

// in Type script we have to import each classes rather then require - require is in Java script 
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {OrdersHistoryPage} from './OrdersHistoryPage';
import {OrdersReviewPage} from './OrdersReviewPage'
import {CartPage} from './CartPage';
import {Page} from '@playwright/test';

export class POManager
{

    //In Type Script need to Decalre what type it is so adding everything here 
    //Page is of type Page and loginPage/dashboard page we are creating Object in the constructor so it is of Class Type so declaing with class name 
    page:Page;
    loginPage:LoginPage;
    dashboardPage: DashboardPage;
    ordersHistoryPage: OrdersHistoryPage;
    ordersReviewPage: OrdersReviewPage;
    cartPage: CartPage;

constructor(page:Page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);

}

getLoginPage()
{
    return this.loginPage;
}

getCartPage()
{
    return this.cartPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}
getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage()
{
    return this.ordersReviewPage;
}
}
module.exports = {POManager};