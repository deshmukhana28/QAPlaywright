const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
        testDataForOrder :
        {
            userName : "Deshmukh@gmail.com",
            userpassword : "Anu@1234",
            productName : "ZARA COAT 3"

        }
    }
)