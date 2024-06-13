import { browser, devices } from 'k6/experimental/browser';

export const options = {
  scenarios: {
    browser: {
      executor: 'shared-iterations',
      options: {
        browser: {
          type: 'chromium',
        },
      },
    },
  },
  thresholds: {
    checks: ['rate==1.0'],
  },
};

export default async function () {
  const iphoneX = devices['iPhone X'];
  const context = browser.newContext();
  const page = context.newPage();

  try {
    await page.goto('https://test.k6.io/');
  } finally {
    page.close();
  }
}