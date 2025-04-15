import { Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ResultsPage extends BasePage {
  readonly search: Locator;
  readonly temperaturePicker: Locator;
  readonly windSpeedPicker: Locator;
  readonly temperatureInformation: Locator;
  readonly temperature: Locator;
  readonly windSpeed: Locator;
  readonly showForecastButton: Locator;
  readonly pollenLink: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.page = page;
    this.search = page.getByTestId('location-search-input');
    this.temperaturePicker = page.getByTestId('temperature-unit-select');
    this.windSpeedPicker = page.getByTestId('wind-unit-select');
    this.temperatureInformation = page.locator(
      'button[aria-label="Temperature information"]',
    );
    // TODO: Make this take a parameter for the temperature link
    this.temperature = page
      .getByTestId('dayTab0')
      .locator('span[data-unit="temperature"]')
      .first();
    this.windSpeed = page
      .locator('div[data-unit="windSpeed"]')
      .first()
      .locator('div[data-unit="windSpeed"]');
    this.showForecastButton = page.getByTestId('btnDetailedView');
    // TODO: Make this take a parameter for the pollen link
    this.pollenLink = page.locator('.day-tab-symbol.pollen-link').first();
  }

  /**
   * Navigates to the results page of the Met Office website.
   * Defaults to a specific location if no value is provided.
   * @param value - The location identifier (default: 'u1214b469').
   */
  async navigateTo(value: string = 'u1214b469') {
    await this.page.goto(`https://weather.metoffice.gov.uk/forecast/${value}`);
  }

  /**
   * Selects the temperature unit in the temperature picker.
   * @param value - The temperature unit to select. Can be either '°C' (Celsius) or '°F' (Fahrenheit).
   */
  async selectTemperaturePicker(value: '°C' | '°F') {
    await this.temperaturePicker.selectOption(value);
  }

  /**
   * Selects the wind speed unit in the wind speed picker.
   * @param value - The wind speed unit to select. Can be either 'mph', 'km/h', 'm/s', 'knots', or 'Beaufort'.
   */
  async selectWindSpeedPicker(
    value: 'mph' | 'km/h' | 'm/s' | 'knots' | 'Beaufort',
  ) {
    await this.windSpeedPicker.selectOption(value);
  }

  /**
   * Clicks on the Show temperature Information icon.
   */
  async openTemperatureTooltip() {
    await this.temperatureInformation.click();
  }
}
