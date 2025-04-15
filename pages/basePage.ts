import { Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  readonly dismissCookieButton: Locator;
  readonly tooltipContent: Locator;
  readonly tooltip: Locator;

  constructor(public readonly page: Page) {
    this.page = page;
    this.dismissCookieButton = page.getByTestId('ccc-dismiss-button');
    this.tooltip = page.getByTestId('tooltip');
    this.tooltipContent = page.getByTestId('tooltip-content');
  }

  /**
   * Dismisses the cookie message if it is visible on the page.
   *
   * This method waits for the cookie dismiss button to become visible,
   * checks if it is currently displayed, and clicks it to dismiss the
   * cookie message. After clicking, it waits for the button to be hidden
   * to ensure the action is completed.
   *
   * @returns A promise that resolves once the cookie message is dismissed.
   */
  async dismissCookieMessage() {
    await this.page.waitForSelector('[id="ccc-dismiss-button"]', {
      state: 'visible',
    });
    if (await this.dismissCookieButton.isVisible()) {
      await this.dismissCookieButton.click();
      await this.dismissCookieButton.waitFor({ state: 'hidden' });
    }
  }
}
