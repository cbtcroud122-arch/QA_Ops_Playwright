Feature: Error Validation 

@Validation
Scenario Outline: Placing the Order
     Given login to the Ecommerce Application using "<username>" and "<password>"
     Then Validate Error Message displayed 

Examples:
| username              | password |
| cbtcroud122@gmail.com | Test@123 |
| 123@Gmail.com         | Test!123 |