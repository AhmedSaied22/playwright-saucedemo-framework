import { Locator, Page, expect } from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly title: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.cartItems = page.locator('[data-test="inventory-item"]');
        this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
    }

    async open() {
        await this.page.goto('/cart.html');
    }
    async assertCartPageLoaded() {
      await expect(this.title).toHaveText('Your Cart');
    }

    async getCartItemsCount() {
        return await this.cartItems.count();
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async removeProductFromCart(index: number){
        await this.cartItems
        .nth(index)
        .locator('[data-test^="remove"]')
        .click();
    }

}