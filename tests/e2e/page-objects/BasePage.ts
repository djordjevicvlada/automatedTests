import {Locator, Page} from '@playwright/test'

export class BasePage {
    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async wait(time) {
        await this.page.waitForTimeout(time)
    }

    async clickOnElement(element: Locator) {
        await element.waitFor({state: 'visible'}).then(async () => {
            await element.click()
        });
    }

    async enterValue(element: Locator, value: string) {
        await element.waitFor({state: 'visible'}).then(async () => {
            await element.type(value)
        });
    }

    async waitUntilVisible(element: Locator) {
        await element.waitFor({state: 'visible'}).then(async () => {
            await element.isVisible()
        });
    }

    async waitForOneElementAndClickOnOther(element: Locator, elem2: Locator) {
        await element.waitFor({state: 'visible'}).then(async () => {
            await elem2.click()
        });
    }
}