import { test, expect } from '../../../src/fixtures/base';
import { users } from '../../../src/data/users';
import { setAllureMeta } from '../../../src/utils/allure.util';

test.describe('Smoke - SauceDemo', () => {
    test.beforeEach(async () => {
        await setAllureMeta({
            parentSuite: 'UI',
            suite: 'Smoke',
            feature: 'Smoke Tests',
            tags: ['ui', 'smoke'],
        });
    });

    test('should login successfully with valid credentials @smoke', async ({ loginPage, page }) => {
        await setAllureMeta({
            story: 'Login smoke',
            severity: 'blocker',
            description:
                'Smoke: Verify that a standard user can log in with valid credentials.',
        });

        await loginPage.login(users.valid.username, users.valid.password);
        await expect(page).toHaveURL(/inventory/);
    });

    test('should display products on inventory page @smoke', async ({ inventoryPage }) => {
        await setAllureMeta({
            story: 'Inventory smoke',
            severity: 'blocker',
            description:
                'Smoke: Verify that products are visible on the inventory page after login.',
        });

        await inventoryPage.open();
        const count = await inventoryPage.getProductsCount();
        expect(count).toBeGreaterThan(0);
    });

    test('should add product to cart and see it in cart page @smoke', async ({
        inventoryPage,
        cartPage,
    }) => {
        await setAllureMeta({
            story: 'Add to cart smoke',
            severity: 'blocker',
            description:
                'Smoke: Verify the core add-to-cart flow from inventory to the cart page.',
        });

        await inventoryPage.open();
        await inventoryPage.addProductToCart(0);
        await inventoryPage.assertCartCount('1');

        await cartPage.open();
        await cartPage.assertCartPageLoaded();

        const itemCount = await cartPage.getCartItemsCount();
        expect(itemCount).toBe(1);
    });

    test('should complete end-to-end checkout flow @smoke', async ({
        inventoryPage,
        cartPage,
        checkoutStepOnePage,
        checkoutOverviewPage,
        checkoutCompletePage,
    }) => {
        await setAllureMeta({
            story: 'Checkout smoke',
            severity: 'blocker',
            description:
                'Smoke: Verify the full checkout flow — add product, fill info, finish, and confirm order.',
        });

        await inventoryPage.open();
        await inventoryPage.addProductToCart(0);

        await cartPage.open();
        await cartPage.assertCartPageLoaded();

        await cartPage.clickCheckout();
        await checkoutStepOnePage.fillInformation('Ahmed', 'Saied', '12345');
        await checkoutOverviewPage.finishOrder();
        await checkoutCompletePage.assertOrderCompleted();
    });
});
