Feature: Ecommorce validation
@Regression
@smoke
Scenario: Placing the Order
Given Login to Ecommerce application with "Deshmukh@gmail.com" and "Anu@1234"
When Add "ZARA COAT 3" to cart
Then Verify "ZARA COAT 3" is dispayed in the cart
When Enter valid details and place the Order
Then Verify order is present in the OrderHistoyPage

Scenario Outline: Parameterization of scenario
Given Login to Ecommerce application with "<username>" and "<password>"
When Add "<product>" to cart
Then Verify "<product>" is dispayed in the cart
Examples:
| username            | password  | product      |
| Deshmukh@gmail.com  | Anu@1234  | ZARA COAT 3  |


