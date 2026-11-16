import {test as baseTest} from '@playwright/test';
interface TestDataForOrder
{
    userName : string;
    userpassword : string;
    productName : string;
}

export const customtest = baseTest.extend<{testDataForOrder:TestDataForOrder }>(
    {
        testDataForOrder :
        {
            userName : "Deshmukh@gmail.com",
            userpassword : "Anu@1234",
            productName : "ZARA COAT 3"

        }
    }
)