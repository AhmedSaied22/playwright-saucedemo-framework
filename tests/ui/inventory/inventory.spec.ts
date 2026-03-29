import { test, expect } from '../../../src/fixtures/base';
import { setAllureMeta } from '../../../src/utils/allure.util';

test.describe('Inventory - SauceDemo', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await setAllureMeta({
      parentSuite: 'UI',
      suite: 'Inventory',
      feature: 'Inventory Management',
      tags: ['ui', 'inventory'],
    });

    await inventoryPage.open();
  });

  test('should display products after successful login', async ({ inventoryPage }) => {
    await setAllureMeta({
      story: 'View inventory products',
      severity: 'critical',
      description:
        'Verify that an authenticated user can view the inventory product list successfully.',
    });

    const count = await inventoryPage.getProductsCount();
    expect(count).toBeGreaterThan(0);
  });

  test('should add product to cart and update cart badge', async ({ inventoryPage }) => {
    await setAllureMeta({
      story: 'Add product to cart',
      severity: 'critical',
      description:
        'Verify that adding a product from inventory updates the cart badge count.',
    });

    await inventoryPage.addProductToCart(4);
    await inventoryPage.assertCartCount('1');
  });

  test('should remove added product from inventory page and hide cart badge', async ({ inventoryPage }) => {
    await setAllureMeta({
      story: 'Remove product from inventory cart state',
      severity: 'normal',
      description:
        'Verify that removing a previously added product hides the cart badge.',
    });

    await inventoryPage.addProductToCart(4);
    await inventoryPage.removeProductFromCart(4);

    await expect(inventoryPage.cartBadge).toBeHidden();
  });

  test('should display all products with valid data', async ({ inventoryPage }) => {
    await setAllureMeta({
      story: 'Validate inventory data',
      severity: 'normal',
      description:
        'Verify that each inventory product displays valid name, description, and price.',
    });

    await inventoryPage.assertAllProductsHaveValidData();
  });

  test('should open product details page when clicking on product', async ({ inventoryPage }) => {
    await setAllureMeta({
      story: 'Open product details',
      severity: 'normal',
      description:
        'Verify that clicking a product name opens the product details page.',
    });

    await inventoryPage.openProductDetails(0);
    await inventoryPage.assertProductDetailsPageOpened();
  });

  test('should sort products by name A to Z', async ({ inventoryPage }) => {
    await setAllureMeta({
      story: 'Sort products by name',
      severity: 'minor',
      description:
        'Verify that products can be sorted alphabetically from A to Z.',
    });

    await inventoryPage.sortProductsBy('az');

    const actualNames = await inventoryPage.getProductNames();
    const expectedNames = [...actualNames].sort((a, b) => a.localeCompare(b));

    expect(actualNames).toEqual(expectedNames);
  });

  test('should sort products by price low to high', async ({ inventoryPage }) => {
    await setAllureMeta({
      story: 'Sort products by price',
      severity: 'minor',
      description:
        'Verify that products can be sorted by price from low to high.',
    });

    await inventoryPage.sortProductsBy('lohi');

    const actualPrices = await inventoryPage.getProductPrices();
    const expectedPrices = [...actualPrices].sort((a, b) => a - b);

    expect(actualPrices).toEqual(expectedPrices);
  });

  test('should reset app state clear all cart items and reset buttons', async ({ inventoryPage }) => {
    await setAllureMeta({
      subSuite: 'Known Issues',
      story: 'Reset application state',
      severity: 'normal',
      tags: ['ui', 'inventory', 'known-bug'],
      description:
        'Known SauceDemo issue: Reset App State clears the cart badge but does not restore the product button back to Add to cart.',
    });

    await inventoryPage.addProductToCart(4);
    await inventoryPage.resetAppState();

    await expect(inventoryPage.cartBadge).toBeHidden();

    // This assertion is intentionally expected to fail due to a known application bug.
    await expect(inventoryPage.removeFromCartButtons).toHaveCount(0);
  });
});