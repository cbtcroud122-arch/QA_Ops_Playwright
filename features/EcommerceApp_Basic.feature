Feature: Ecommerce Validation

    @Regression
    Scenario: Placing the Valid Order
        Given login to the Application using "cbtcroud122@gmail.com" and "Test@123"
        When Add "ADIDAS ORIGINAL" to cart
        Then Verify "ADIDAS ORIGINAL" is displayed in the cart
        When Enter Valid details and place the Order
        Then Verify Order is present in the OrderHistory

    @Validation
    Scenario Outline: Placing the Order - Error Check
        Given login to the Ecommerce Application using "<username>" and "<password>"
        Then Validate Error Message displayed

        Examples:
            | username              | password |
            | cbtcroud122@gmail.com | Test@123 |
            | 123@Gmail.com         | Test!123 | 