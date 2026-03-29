import { test, expect } from '../../../src/fixtures/base';
import { setAllureMeta } from '../../../src/utils/allure.util';

test.describe('Cart - SauceDemo', () => {
  test.beforeEach(async () => {
    await setAllureMeta({
      parentSuite: 'UI',
      suite: 'Cart',
      feature: 'Cart Management',
      tags: ['ui', 'cart'],
    });
  });

  test('should navigate to cart page when clicking cart icon', async ({ cartPage }) => {
    await setAllureMeta({
      story: 'Open cart page',
      severity: 'normal',
      description: 'Verify that the user can open the cart page successfully.',
    });

    await cartPage.open();
    await cartPage.assertCartPageLoaded();
  });

  test('should display correct number of items in cart', async ({ inventoryPage, cartPage }) => {
    await setAllureMeta({
      story: 'View cart item count',
      severity: 'critical',
      description: 'Verify that cart displays the correct number of added items.',
    });

    await inventoryPage.open();
    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);

    await cartPage.open();

    const itemCount = await cartPage.getCartItemsCount();
    expect(itemCount).toBe(2);
  });

  test('should remove product from cart page', async ({ inventoryPage, cartPage }) => {
    await setAllureMeta({
      story: 'Remove item from cart',
      severity: 'normal',
      description: 'Verify that a product can be removed successfully from the cart page.',
    });

    await inventoryPage.open();
    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);

    await cartPage.open();
    await cartPage.removeProductFromCart(0);

    const itemCount = await cartPage.getCartItemsCount();
    expect(itemCount).toBe(1);
  });

  test('should return to inventory page when clicking continue shopping', async ({ cartPage, inventoryPage }) => {
    await setAllureMeta({
      story: 'Continue shopping navigation',
      severity: 'minor',
      description: 'Verify that clicking Continue Shopping redirects the user back to inventory.',
    });

    await cartPage.open();
    await cartPage.assertCartPageLoaded();

    await cartPage.clickContinueShopping();
    await inventoryPage.assertPageLoaded();
  });
});