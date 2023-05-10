import {BasePage} from "./BasePage";
import {expect, Locator, Page} from "@playwright/test";
import {faker} from "@faker-js/faker";

export class CheckOutInfoPage extends BasePage {

    readonly firstName: Locator
    readonly lastName: Locator
    readonly postalCode: Locator
    readonly continueBTN: Locator
    readonly finishBTN: Locator
    readonly checkOutCompleted: Locator

    constructor(page: Page) {
        super(page);
        this.firstName = page.locator('#first-name')
        this.lastName = page.locator('#last-name')
        this.postalCode = page.locator('#postal-code')
        this.continueBTN = page.locator('#continue')
        this.finishBTN = page.locator('#finish')
        this.checkOutCompleted = page.getByText('Thank you for your order!Your order has been dispatched, and will arrive just as')
    }

    async fillOrderDataAndContinue() {
        await this.enterValue(this.firstName, faker.name.firstName())
        await this.enterValue(this.lastName, faker.name.lastName())
        await this.enterValue(this.postalCode, faker.address.zipCode())
        await this.clickOnElement(this.continueBTN)
        await this.clickOnElement(this.finishBTN)
    }

    async orderIsCompleted() {
        expect(this.waitUntilVisible(this.checkOutCompleted))
    }

}