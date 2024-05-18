import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";

/**
 * Configuration options for a K6 load test.
 *
 * The `options` object configures various aspects of the load test, such as performance thresholds and the ramp-up/ramp-down of virtual users.
 *
 * @property {Object} thresholds - Defines performance thresholds that the load test must meet.
 * @property {string[]} thresholds.http_req_duration - Asserts that 99% of requests finish within 3000ms.
 * @property {Object[]} stages - Defines the stages of the load test, including the duration and target number of virtual users.
 * @property {string} stages[].duration - The duration of the stage, e.g. "30s" for 30 seconds.
 * @property {number} stages[].target - The target number of virtual users for the stage.
 * @type {Options}
 */
export const options = {
  thresholds: {
    // Assert that 99% of requests finish within 3000ms.
    http_req_duration: ["p(99) < 3000"],
  },
  // Ramp the number of virtual users up and down
  stages: [
    { duration: "30s", target: 15 },
    { duration: "1m", target: 15 },
    { duration: "20s", target: 0 },
  ],
};

// Simulated user behavior
export default function () {
  let res = http.get("https://test-api.k6.io/public/crocodiles/1/");
  // Validate response status
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}