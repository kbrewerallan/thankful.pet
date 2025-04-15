import {
  test,
  expect,
  validateTemperatureConversion,
  validateWindSpeedConversion,
} from "../fixtures/resultsPageFixture";
import { PollenPage } from "../pages/pollenPage";
import { TEMPERATURE_DESCRIPTION } from "../utils/constants";
import { celsiusToFahrenheit, convertMphToKmh } from "../utils/helpers";

test.describe("Results Page Tests", () => {
  test("Search input is present", async ({ resultsPage }) => {
    await expect(resultsPage.search).toBeVisible();
  });

  test("Search results are present", async ({ resultsPage }) => {
    await expect(resultsPage.search).toHaveValue("Cambridge (Cambridgeshire)");
  });

  test("Pollen link navigation", async ({ resultsPage }) => {
    await resultsPage.pollenLink.click();
    await expect(new PollenPage(resultsPage.page).articleHeader).toHaveText(
      "Pollen forecast",
    );
  });

  test("Temperature setting applies changes", async ({ resultsPage }) => {
    await resultsPage.selectTemperaturePicker("°C");
    const temperatureCelciusText = await resultsPage.temperature.textContent();
    if (!temperatureCelciusText) {
      throw new Error("Temperature text value is null");
    }
    await resultsPage.selectTemperaturePicker("°F");

    await expect(resultsPage.temperature).not.toHaveText(
      temperatureCelciusText,
    );
    await validateTemperatureConversion(
      resultsPage,
      celsiusToFahrenheit(temperatureCelciusText),
    );
  });

  test("Validate temperature tooltip", async ({ resultsPage }) => {
    await resultsPage.openTemperatureTooltip();
    await expect(resultsPage.tooltipContent).toHaveText(
      TEMPERATURE_DESCRIPTION,
    );
  });

  test("Wind speed setting applies changes", async ({ resultsPage }) => {
    await resultsPage.selectWindSpeedPicker("mph");
    const mphSpeed = await resultsPage.windSpeed.textContent();
    if (!mphSpeed) {
      throw new Error("Wind speed text value is null");
    }
    await resultsPage.selectWindSpeedPicker("km/h");
    await expect(resultsPage.windSpeed).not.toHaveText(mphSpeed);
    await validateWindSpeedConversion(resultsPage, convertMphToKmh(mphSpeed));
  });
});

// TODO: Add tests for the following scenarios ( could also be move to component tests ):
// 1. Validate the wind speed tooltip content.
// 2. Validate the show forecast button functionality.
// 3. Validate the Visibility and Humidity units in the forecast.
