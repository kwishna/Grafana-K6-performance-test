import { check } from 'k6';
import { browser } from 'k6/experimental/browser';

export const options = {
    scenarios: {
        browser: {
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium',
                    headless: false
                },
            },
        },
    },
    thresholds: {
        checks: ['rate==1.0'],
    },
};

export default async function () {

    const context = browser.newContext();
    const page = context.newPage();

    try {
        await page.goto('https://test.k6.io/');
        const url = page.url();
        check(url, {
            'verify url': (r) => r.includes('test.k6.io')
          });
    } finally {
        page.close();
    }
}