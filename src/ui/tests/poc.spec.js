import { Trend } from 'k6/metrics';
import http from 'k6/http';
// import {
//     randomIntBetween,
//     randomString,
//     randomItem,
//     uuidv4,
//     findBetween,
//   } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { check, group, sleep } from 'k6';
import { browser } from 'k6/experimental/browser';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { Options } from 'k6';
import { BasePage } from '../pom/base.page.js';
import { AbTestPage } from '../pom/ab.page.js';
import { DropdownPg } from '../pom/dropdown.page.js';
/**
 * @type {import("k6/options").Options}
 */

export const options = {

    scenarios: {
        "ui": {
            // A fixed amount of iterations are shared between a number of VUs.
            executor: "shared-iterations",
            startTime: '1s', // Waiting time before execution starts.
            gracefulStop: '15s', // Time to wait for iterations to finish executing before stopping them forcefully.
            env: {
                date: `${Date.now()}`
            },

            exec: 'ui_test', // Name of exported JS function to execute. Ex. 'default'

            vus: 1, // Number of VUs to run concurrently.
            iterations: 1, // Number of iterations to execute across per VU.
            maxDuration: '10m', // Maximum scenario duration before it's forcibly stopped (excluding gracefulStop).
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
    httpDebug: 'false',
    noConnectionReuse: false,
    noCookiesReset: true,
    summaryTrendStats: ["min", "max", "avg", "med", "count", "p(90)", "p(95)", "p(99)"],
    thresholds: {
        // checks: ['rate==1.0'],
        http_req_failed: ['rate<1'],
        http_req_duration: ['p(95)<500', 'p(99)<1000'],
        // 'browser_web_vital_lcp': ['p(90) < 10000'],
        // 'browser_web_vital_inp': ['p(90) < 1000'],
    }
}

const myTrend = new Trend('total_action_time', true);

export async function ui_test() {
    const ctx = browser.newContext();
    const page = ctx.newPage();

    const basePg = new BasePage(page);
    const abPg = new AbTestPage(page);
    const drpdwnPg = new DropdownPg(page);

    try {

        await basePg.navigate_to_homepage();
        await basePg.wait_for_homepage_to_load();

        // click
        await basePg.click_ab_link();
        await abPg.wait_for_ab_page_to_load();

        // get text
        const abHeading = await abPg.get_heading();
        check(abHeading, {
            "a/b page heading": (r) => r === "A/B Test Variation 1"
        });

        await basePg.navigate_to_homepage();
        await basePg.click_dropdown_link();

        // select dropdown
        await drpdwnPg.select_value_in_dropdown();

        sleep(5)


        //   myTrend.add(totalActionTime);
    } finally {
        await page.close();
        //   await browser.close();
    }
}

export function handleSummary(data) {
    return {
        "result.html": htmlReport(data)
    };
}