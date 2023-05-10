import {BasePage} from "./BasePage";
import {Locator, Page} from '@playwright/test'

export class LoginPage extends BasePage {

    readonly username: Locator
    readonly password: Locator
    readonly loginBTN: Locator

    constructor(page: Page) {
        super(page)
        this.username = page.locator('#user-name')
        this.password = page.locator('#password')
        this.loginBTN = page.locator('#login-button')
    }

    async loginAsUser(userName: string, passWord: string) {
        await this.page.goto('https://www.saucedemo.com/')
        await this.enterValue(this.username, userName)
        await this.enterValue(this.password, passWord)
        await this.clickOnElement(this.loginBTN)
    }

}