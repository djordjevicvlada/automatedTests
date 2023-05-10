import {BasePage} from "./BasePage";
import {Locator, Page} from "@playwright/test";

export class ProductsPage extends BasePage {

    readonly backpack: Locator
    readonly bike_lamp: Locator
    readonly shoppingCartBTN: Locator
    readonly checkoutBTN: Locator

    constructor(page: Page) {
        super(page);
        this.backpack = page.locator('#add-to-cart-sauce-labs-backpack')
        this.bike_lamp = page.locator('#add-to-cart-sauce-labs-bike-light')
        this.shoppingCartBTN = page.locator('#shopping_cart_container')
        this.checkoutBTN = page.locator('#checkout')
    }

    async selectProducts() {
        await this.clickOnElement(this.backpack)
        await this.clickOnElement(this.bike_lamp)
    }

    async goToShoppingCartAndCheckOut() {
        await this.clickOnElement(this.shoppingCartBTN)
        await this.clickOnElement(this.checkoutBTN)

    }
}