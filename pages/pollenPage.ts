import { Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export enum Regions {
  EastOfEngland = 'East of England',
  LondonAndSouthEastEngland = 'London & South East England',
  SouthWestEngland = 'South West England',
  Wales = 'Wales',
  NoRegion = 'No region selected',
}

export class PollenPage extends BasePage {
  readonly articleHeader: Locator;
  readonly regionSelector: Locator;
  readonly pollenForcecastCard: Locator;
  readonly regionHeader: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.page = page;
    this.page = page;
    this.articleHeader = page.locator('.article-heading');
    this.regionSelector = page.getByTestId('pollen-region-selector');
    this.pollenForcecastCard = page
      .locator('.pollen-forecast-card')
      .filter({ has: page.locator(':visible') });
    this.regionHeader = this.pollenForcecastCard.locator('.region-heading');
  }

  /**
   * Selects a region from the region selector dropdown.
   * @param value - The region to be selected.
   */
  async selectRegion(value: Regions) {
    const options = await this.regionSelector
      .locator('option')
      .allTextContents();
    await this.regionSelector.scrollIntoViewIfNeeded();
    await this.regionSelector.selectOption(value);
  }

  /**
   * Navigates to the pollen forecast page of the Met Office website.
   */
  async navigateTo() {
    await this.page.goto(
      `https://weather.metoffice.gov.uk/warnings-and-advice/seasonal-advice/pollen-forecast`,
    );
  }
}
