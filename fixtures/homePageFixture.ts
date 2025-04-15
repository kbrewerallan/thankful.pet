import { test as base, type Page } from "@playwright/test";
import { HomePage } from "../pages/homePage";

type HomePageFixture = {
  homePage: HomePage;
};

export const test = base.extend<HomePageFixture>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.navigateTo();
    await homePage.dismissCookieMessage();
    await use(homePage);
  },
});

export { expect } from "@playwright/test";
