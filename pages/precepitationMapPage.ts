import { Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

// location-search-input

export class PrecipitationMapPage extends BasePage {
  readonly search: Locator;
  readonly searchSubmit: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.page = page;
    this.search = page.getByTestId('location-search-input');
    this.searchSubmit = page.getByTestId('location-search-submit');
  }

  async scrollAroundPage() {
    await this.page.evaluate(() => window.scrollBy(0, 500));
  }

  async zoomIntoPartOfPage() {
    await this.page.evaluate(() => window.scrollBy(0, 500));
    await this.page.evaluate(() => window.scrollBy(0, -500));
  }

  async enterLocationSearchInput(value: string) {
    await this.search.fill(value);
    await this.searchSubmit.click();
  }

  async navigateTo() {
    await this.page.goto(
      'https://weather.metoffice.gov.uk/maps-and-charts/precipitation-map#?model=ukmo-ukv&layer=precipitation-type&bbox=[[33.578014746144014,-41.74804687500001],[68.46379955520322,33.75000000000001]]',
    );
  }
}
