import {CardDetails} from "./CardDetails";
import {Locator, Page} from '@playwright/test'
import {BasePage} from "../e2e/page-objects/BasePage";

export class StripePayment extends BasePage {
    readonly page: Page
    readonly exp_date: Locator
    readonly ccv: Locator
    readonly name: Locator
    readonly email: Locator
    readonly phone: Locator
    readonly address: Locator
    readonly city: Locator
    readonly state: Locator
    readonly zip: Locator
    readonly cardNumber: Locator
    readonly cardSelector: Locator
    readonly masterCardBTN : Locator
    readonly americanBTN : Locator
    readonly dinersBTN : Locator

    constructor(page: Page) {
        super(page);
        this.exp_date = page.locator('input[name="exp-date"]')
        this.ccv = page.locator('input[name="ccv"]')
        this.name = page.locator('input[name="name"]')
        this.email = page.locator('input[name="email"]')
        this.phone = page.locator('input[name="phone"]')
        this.address = page.locator('input[name="address"]')
        this.city = page.locator('input[name="city"]')
        this.state = page.locator('input[name="state"]')
        this.zip = page.locator('input[name="zip"]')
        this.cardNumber = page.locator('input[name="cardNumber"]')
        this.cardSelector = page.locator('[data-target="#card-type-selector"]')
        this.masterCardBTN = page.locator('button[data-value="mastercard"]')
        this.americanBTN = page.locator('button[data-value="amex"]')
        this.dinersBTN = page.locator('button[data-value="diners"]')
    }

    async makePaymentUI(cardType: string): Promise<void> {

        // fill in the payment form
        await this.enterValue(this.exp_date, CardDetails.DATE);
        await this.enterValue(this.ccv, CardDetails.CCV);
        await this.enterValue(this.name, 'John Doe');
        await this.enterValue(this.email, 'john.doe@example.com');
        await this.enterValue(this.phone, '+1 (123) 456-7890');
        await this.enterValue(this.address, '123 Main St');
        await this.enterValue(this.city, 'San Francisco');
        await this.enterValue(this.state, 'CA');
        await this.enterValue(this.zip, '94107');

        switch (cardType) {
            case "visa":
                await this.enterValue(this.cardNumber, CardDetails.VISA);
                break;
            case 'mastercard':
                await this.clickOnElement(this.cardSelector);
                await this.clickOnElement(this.masterCardBTN);
                await this.enterValue(this.cardNumber, CardDetails.MASTERCARD);
                break;
            case 'american':
                await this.clickOnElement(this.cardSelector);
                await this.clickOnElement(this.americanBTN);
                await this.enterValue(this.cardNumber, CardDetails.AMERICAN);
                break;
            case 'diners':
                await this.clickOnElement(this.cardSelector);
                await this.clickOnElement(this.dinersBTN);
                await this.enterValue(this.cardNumber, CardDetails.DINERS);
                break;
            case CardDetails.LOST_CARD:
            case CardDetails.STOLEN_CARD:
            case CardDetails.GENERIC_DECLINE:
            case CardDetails.NO_FUNDS_CARD:
            case CardDetails.EXPIRED_CARD:
            case CardDetails.WRONG_CCV:
            case CardDetails.PROCESS_ERROR:
            case CardDetails.WRONG_CARD_NO:
                console.error(`Payment declined, error occurred`);
                return;
            default:
                console.error('Invalid card number.');
        }

        // missing locator for OK/Submit button as well as corresponding actions
    }
}