import { Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class HomePage extends BasePage {
  readonly search: Locator;
  readonly searchResults: Locator;
  readonly searchIconButton: Locator;
  readonly errorMessage: Locator;

  constructor(public readonly page: Page) {
    super(page);
    this.page = page;
    this.search = page.getByTestId('location-search-input');
    this.searchResults = page.getByTestId('suggested-results');
    this.searchIconButton = page.getByTestId('location-search-submit');
    this.errorMessage = page.getByTestId('error-messages');
  }

  /**
   * Navigates to the home page of the Met Office website.
   */
  async navigateTo() {
    await this.page.goto('https://www.metoffice.gov.uk/');
  }

  /**
   * Enters a location into the search input field.
   */
  async enterForecastLocation(value: string) {
    await this.search.fill(value);
  }

  /**
   * Selects a suggested result from the search results dropdown.
   *
   * @param value - The text content of the suggested result to be selected.
   */
  async selectSuggestedResult(value: string) {
    this.searchResults.locator('li', { hasText: value }).click();
  }

  /**
   * Selects a suggested result from the search results dropdown by index.
   *
   * @param option - The Index of the option to be selected.
   */
  async selectSuggestedResultByIndex(option: number) {
    this.searchResults.locator('li').nth(option).click();
  }

  /**
   * Clicks on the search icon button to submit the search.
   */
  async useSearchIconButton() {
    await this.searchIconButton.click();
  }

  /**
   * Presses the Enter key on the search input field.
   */
  async useEnterOnSearch() {
    await this.search.press('Enter');
  }
}
