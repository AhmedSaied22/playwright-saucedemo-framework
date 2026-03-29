import { Locator, Page, expect } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly title: Locator;
    readonly products: Locator;
    readonly addToCartButtons: Locator;
    readonly removeFromCartButtons: Locator;
    readonly cartBadge: Locator;
    readonly sortDropDown: Locator;
    readonly resetAppStateButton: Locator;
    readonly menuButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.title = page.locator('[data-test="title"]');
        this.products = page.locator('.inventory_item');
        this.addToCartButtons = page.locator('[data-test^="add-to-cart-"]');
        this.removeFromCartButtons = page.locator('[data-test^="remove"]');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.sortDropDown = page.locator('[data-test="product-sort-container"]');
        this.resetAppStateButton = page.locator('[data-test="reset-sidebar-link"]');
        this.menuButton = page.locator('#react-burger-menu-btn');
    }

    async open() {
        await this.page.goto('/inventory.html');
        await this.assertPageLoaded();
      }

      
    async assertPageLoaded() {
        await expect(this.title).toHaveText('Products');
    }

    async getProductsCount() {
        return await this.products.count();
    }

    async addProductToCart(index: number) {
        await this.products.nth(index).locator('[data-test^="add-to-cart"]')
            .click();
    }

    async removeProductFromCart(index: number) {
        await this.products
            .nth(index)
            .locator('[data-test^="remove"]')
            .click();
    }
    async assertCartCount(count: string) {
        await expect(this.cartBadge).toHaveText(count);
    }

    async assertAllProductsHaveValidData() {
        const count = await this.getProductsCount();
        for (let i = 0; i < count; i++) {
            const product = this.products.nth(i);
            await expect(product.locator('.inventory_item_name')).toBeVisible();
            await expect(product.locator('.inventory_item_desc')).toBeVisible();
            await expect(product.locator('.inventory_item_price')).toBeVisible();
        }
    }

    async openProductDetails(index: number) {
        await this.products
            .nth(index)
            .locator('[data-test="inventory-item-name"]')
            .click();
    }

    async assertProductDetailsPageOpened() {
        await expect(this.page.locator('.inventory_details_name')).toBeVisible();
    }
    async sortProductsBy(option: string) {
        await this.sortDropDown.selectOption(option);
    }

    async getProductNames() {
        return await this.products.locator('.inventory_item_name').allTextContents();
    }

    async getProductPrices() {
        const pricesText = await this.products.locator('.inventory_item_price').allTextContents();
        return pricesText.map(price => Number(price.replace('$', '')));
    }

    async resetAppState() {
        await this.menuButton.click();
        await this.resetAppStateButton.click();
    }
}