import { test as base, expect, type Page } from "@playwright/test";
import { ResultsPage } from "../pages/resultsPage";

type ResultsPageFixture = {
  resultsPage: ResultsPage;
};

export async function validateTemperatureConversion(
  resultsPage: ResultsPage,
  temperatureFahrenheit: number,
) {
  await expect(resultsPage.temperature).toHaveText(
    new RegExp(
      `^${Math.round(temperatureFahrenheit)}°|${Math.round(temperatureFahrenheit) + 1}°$`,
    ),
  );
}

export async function validateWindSpeedConversion(
  resultsPage: ResultsPage,
  windSpeedKmh: number,
) {
  await expect(resultsPage.windSpeed).toHaveText(
    new RegExp(`^${Math.round(windSpeedKmh)}|${Math.round(windSpeedKmh) - 1}$`),
  );
}

export const test = base.extend<ResultsPageFixture>({
  resultsPage: async ({ page }, use) => {
    const resultsPage = new ResultsPage(page);
    await resultsPage.navigateTo();
    await resultsPage.dismissCookieMessage();
    await use(resultsPage);
  },
});

export { expect } from "@playwright/test";
