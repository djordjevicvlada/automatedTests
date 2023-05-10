import {test} from "@playwright/test";
import {LoginPage} from "../page-objects/LoginPage";
import {CheckOutInfoPage} from "../page-objects/CheckOutInfoPage";
import {ProductsPage} from "../page-objects/ProductsPage";
import {TestData} from "../page-objects/TestData"

let loginPage: LoginPage
let checkOutInfoPage: CheckOutInfoPage
let productsPage: ProductsPage

test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    checkOutInfoPage = new CheckOutInfoPage(page);
    productsPage = new ProductsPage(page)
})

test('Standard user place order successfully', async ({}) => {

    await test.step('User selects products for purchase', async () => {
        await loginPage.loginAsUser(TestData.STANDARD_USER, TestData.PASSWORD)
        await productsPage.selectProducts()
        await productsPage.goToShoppingCartAndCheckOut()
    });

    await test.step('User fill required data and place order', async () => {
        await checkOutInfoPage.fillOrderDataAndContinue()
    });

    await test.step('Successful purchase info is show', async () => {
        await checkOutInfoPage.orderIsCompleted()
    });
});