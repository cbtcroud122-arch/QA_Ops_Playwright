import { Page, Locator } from '@playwright/test';

export class LoginPracticePageViaMCP {

    page: Page;
    usernameInput: Locator;
    passwordInput: Locator;
    signInButton: Locator;
    termsCheckbox: Locator;
    errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator("#username");
        this.passwordInput = page.locator("#password");
        this.signInButton = page.locator("#signInBtn");
        this.termsCheckbox = page.locator("#terms");
        this.errorMessage = page.locator(".alert.alert-danger");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async waitForErrorMessage() {
        await this.page.waitForSelector(".alert.alert-danger");
    }

    async getErrorMessageText(): Promise<string> {
        return await this.errorMessage.textContent() || "";
    }

    async loginWithInvalidCredentials(username: string, password: string) {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSignInButton();
        await this.waitForErrorMessage();
    }
}

module.exports = { LoginPracticePageViaMCP };
