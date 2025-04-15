import { test, expect } from "../fixtures/homePageFixture";
import { ResultsPage } from "../pages/resultsPage";
import { SEARCH_ERROR } from "../utils/constants";

test.describe("Search Functionality Tests", () => {
  test("Search is present", async ({ homePage }) => {
    await expect(homePage.search).toBeVisible();
  });

  test("Search results are present", async ({ homePage }) => {
    await homePage.enterForecastLocation("Cambridge");
    await expect(homePage.searchResults).toBeVisible();
  });

  const invalidSearches = ["----", "@$%^&*", "NotARealPlace", "12345"];
  invalidSearches.forEach((search) => {
    test(`Invalid search "${search}" no results`, async ({ homePage }) => {
      await homePage.enterForecastLocation(search);
      await expect(homePage.searchResults).not.toBeVisible();
      await expect(homePage.errorMessage).toBeVisible();
      await expect(homePage.errorMessage).toContainText(SEARCH_ERROR);
    });
  });

  test("Search navigates to the results page", async ({ homePage }) => {
    await homePage.enterForecastLocation("Cambridge");
    await expect(homePage.searchResults).toBeVisible();
    await homePage.selectSuggestedResultByIndex(0);
    await expect(new ResultsPage(homePage.page).search).toHaveValue(
      "Cambridge (Cambridgeshire)",
    );
  });
});

// TODO: Add tests for the following scenarios ( could also be move to component tests ):
// 1. Validate the search input field is empty on page load.
// 2. Validate the search results dropdown is empty when no input is provided.
// 3. Validate the search results dropdown is not visible when no input is provided.
// 4. Validate the search results dropdown is not visible when input is cleared.
// 5. Validate the search results dropdown is not visible when input is valid but no results are found.
// 6. Validate the search input character limit (e.g., 100 characters).
// 7. Validate search input types (e.g., Postcode, Country).
