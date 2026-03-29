import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/login.page';
import { users } from '../../src/data/users';

const authFile = 'playwright/.auth/standard-user.json';

setup('authenticate standard user', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goTo();
  await loginPage.login(users.valid.username, users.valid.password);

  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({ path: authFile });
});