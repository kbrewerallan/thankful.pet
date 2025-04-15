import { test, expect } from "../fixtures/pollenPageFixture";
import { Regions } from "../pages/pollenPage";

test.describe("Pollen Forecast Tests", () => {
  test("Region selector is present", async ({ pollenPage }) => {
    await expect(pollenPage.regionSelector).toBeVisible();
  });

  test("Selecting No Region hides card", async ({ pollenPage }) => {
    await pollenPage.selectRegion(Regions.Wales);
    await expect(pollenPage.regionHeader).toBeVisible();
    await pollenPage.selectRegion(Regions.NoRegion);
    await expect(pollenPage.regionHeader).not.toBeVisible();
  });

  const regions: Regions[] = [
    Regions.EastOfEngland,
    Regions.LondonAndSouthEastEngland,
    Regions.SouthWestEngland,
  ];

  regions.forEach((region) => {
    test(`Region is applied: ${region}`, async ({ pollenPage }) => {
      await pollenPage.selectRegion(region);
      await expect(pollenPage.regionHeader).toContainText(region);
    });
  });
});

// TODO: Add tests for the following scenarios ( could also be move to component tests ):
// 1. Validate the pollen forecast card content for different regions.
// 2. Validate the pollen foresast map content for different regions.
