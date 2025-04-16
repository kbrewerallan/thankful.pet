import { test, expect } from "../fixtures/homePageFixture";
import { HomePage } from "../pages/homePage";
import { PollenPage } from "../pages/pollenPage";
import { ResultsPage } from "../pages/resultsPage";
import { Regions } from "../pages/pollenPage";

test("User search flow", async ({ page }) => {
  // Homepage interactions
  const homepage = new HomePage(page);
  await homepage.navigateTo();
  await homepage.dismissCookieButton.click();
  await homepage.enterForecastLocation("Cambridge");
  await homepage.selectSuggestedResultByIndex(0);

  // Results page interactions
  const resultsPage = new ResultsPage(page);
  await expect(resultsPage.search).toHaveValue("Cambridge");
  await resultsPage.pollenLink.click();

  // Pollen page interactions
  const pollenPage = new PollenPage(page);
  await expect(pollenPage.articleHeader).toHaveText("Pollen forecast");
  await expect(await pollenPage.activeRegionHeader(Regions.EastOfEngland)).toBeVisible();

  // TODO: Investigate why this is not working as expected when running as an automated test.
  // const precepitationMapPage = new PrecipitationMapPage(page);
  // precepitationMapPage.navigateTo();
  // await precepitationMapPage.enterLocationSearchInput('Cambridge');
  // await expect(precepitationMapPage.search).toHaveValue('Cambridge (Cambridgeshire)');

  // TODO: Use visual regression tests to validate the map content changes regularly.
});
