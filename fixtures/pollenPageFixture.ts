import { test as base, type Page } from "@playwright/test";
import { PollenPage } from "../pages/pollenPage";

type PollenPageFixture = {
  pollenPage: PollenPage;
};

export const test = base.extend<PollenPageFixture>({
  pollenPage: async ({ page }, use) => {
    const pollenPage = new PollenPage(page);
    await pollenPage.navigateTo();
    await pollenPage.dismissCookieMessage();
    await use(pollenPage);
  },
});

export { expect } from "@playwright/test";
