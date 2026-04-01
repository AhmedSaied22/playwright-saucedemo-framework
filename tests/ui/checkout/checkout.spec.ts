import { test } from '../../../src/fixtures/base';
import { setAllureMeta } from '../../../src/utils/allure.util';

test.describe('Checkout - SauceDemo', () => {
  test.beforeEach(async () => {
    await setAllureMeta({
      parentSuite: 'UI',
      suite: 'Checkout',
      feature: 'Checkout Flow',
      tags: ['ui', 'checkout'],
    });
  });

  test('should complete checkout successfully', async ({
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutOverviewPage,
    checkoutCompletePage,
  }) => {
    await setAllureMeta({
      story: 'Complete checkout flow',
      severity: 'critical',
      description:
        'Verify that a user can complete the checkout process successfully after adding a product to the cart.',
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