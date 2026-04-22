//Author: Sumanth
import { test, expect } from '@playwright/test';
import { LoginPracticePageViaMCP } from '../pageobjects_TypeScrit/LoginPracticePageViaMCP';

test('@Web Invalid Login Credentials Test', async ({ page }) => {
    // Create instance of LoginPracticePage
    const loginPracticePage = new LoginPracticePageViaMCP(page);
    
    // Navigate to login page
    await loginPracticePage.goTo();
    
    // Enter invalid credentials
    await loginPracticePage.enterUsername("Sumanth");
    await loginPracticePage.enterPassword("testpass");
    
    // Click Sign In button
    await loginPracticePage.clickSignInButton();
    
    // Wait till error message is displayed
    await loginPracticePage.waitForErrorMessage();
    
    // Verify error message text contains "Incorrect"
    await expect(page.locator(".alert.alert-danger")).toContainText("Incorrect");
    
    // Validate full error message is displayed
    const errorMessage = await loginPracticePage.getErrorMessageText();
    expect(errorMessage.toLowerCase()).toContain("incorrect username/password");
});
