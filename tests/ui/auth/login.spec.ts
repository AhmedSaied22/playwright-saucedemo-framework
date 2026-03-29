import { test, expect } from '../../../src/fixtures/base';
import { users } from '../../../src/data/users';
import { setAllureMeta } from '../../../src/utils/allure.util';

test.describe('Login - SauceDemo', () => {
  test.beforeEach(async () => {
    await setAllureMeta({
      parentSuite: 'UI',
      suite: 'Auth',
      feature: 'Authentication',
      tags: ['ui', 'auth'],
    });
  });

  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await setAllureMeta({
      story: 'Successful login',
      severity: 'critical',
      description:
        'Verify that a standard user can log in successfully with valid credentials.',
    });

    await loginPage.login(users.valid.username, users.valid.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('should show error for locked out user', async ({ loginPage }) => {
    await setAllureMeta({
      story: 'Locked out user validation',
      severity: 'normal',
      description:
        'Verify that a locked out user receives the correct error message during login.',
    });

    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.errMessage).toContainText('Epic sadface');
  });

  test('should show error when username and password are empty', async ({ loginPage }) => {
    await setAllureMeta({
      story: 'Empty credentials validation',
      severity: 'normal',
      description:
        'Verify that login shows a validation error when username and password are empty.',
    });

    await loginPage.login(users.empty.username, users.empty.password);
    await expect(loginPage.errMessage).toContainText('Username is required');
  });
});