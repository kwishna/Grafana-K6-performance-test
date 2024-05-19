import http from "k6/http";
import { check, sleep } from "k6";
// import { Options } from "k6/options";

/**
 * @type {Options}
 */
export const options = {

  scenarios: {
    // "scenario_name_1": {
    //  // A fixed amount of iterations are shared between a number of VUs.
    //   executor: "shared-iterations",
    //
    //   // common scenario configuration
    //   startTime: '1s', // Waiting time before execution starts.
    //   gracefulStop: '5s', // Time to wait for iterations to finish executing before stopping them forcefully.
    //   env: {
    //     date: `${Date.now()}`
    //   },
    //   tags: {
    //     tagName: '@GetReq'
    //   },
    //
    //   exec: 'get_request', // Name of exported JS function to execute. Ex. 'default'
    //
    //   // executor-specific configuration. || 100 iterations shared among 10 VUs ||
    //   vus: 10, // Number of VUs to run concurrently.
    //   iterations: 100, // Number of iterations to execute across per VU.
    //   maxDuration: '10s' // Maximum scenario duration before it's forcibly stopped (excluding gracefulStop).
    // },
    // ----------------------------------------------------------------------------------------------------------------------
    // ======================================================================================================================
    // ----------------------------------------------------------------------------------------------------------------------
    // "scenario_name_2": {
    //   // Each VU executes an exact number of iterations.
    //   executor: "per-vu-iterations",
    //
    //   // common scenario configuration
    //   startTime: '1s', // Waiting time before execution starts.
    //   gracefulStop: '5s', // Time to wait for iterations to finish executing before stopping them forcefully.
    //   env: {
    //     date: `${Date.now()}`
    //   },
    //   tags: {
    //     tagName: '@GetReq'
    //   },
    //
    //   exec: 'get_request', // Name of exported JS function to execute. Ex. 'default'
    //
    //   // executor-specific configuration || 100 iterations for each of 10 VUs ||
    //   vus: 10,
    //   iterations: 100
    // }
    // ----------------------------------------------------------------------------------------------------------------------
    // ======================================================================================================================
    // ----------------------------------------------------------------------------------------------------------------------
    // "scenario_name_3": {
    //   // A fixed number of VUs execute as many iterations as possible for a specified amount of time.
    //   executor: "constant-vus",
    //
    //   // common scenario configuration
    //   startTime: '1s', // Waiting time before execution starts.
    //   gracefulStop: '5s', // Time to wait for iterations to finish executing before stopping them forcefully.
    //   env: {
    //     date: `${Date.now()}`
    //   },
    //   tags: {
    //     tagName: '@GetReq'
    //   },
    //
    //   exec: 'get_request', // Name of exported JS function to execute. Ex. 'default'
    //
    //   // executor-specific configuration || 10 looping VUs for 15s ||
    //   vus: 10,
    //   duration: '15s' // Total scenario duration (excluding gracefulStop time)
    // }
    // ----------------------------------------------------------------------------------------------------------------------
    // ======================================================================================================================
    // ----------------------------------------------------------------------------------------------------------------------
    // "scenario_name_4": {
    //   // A variable number of VUs execute as many iterations as possible for a specified amount of time.
    //   executor: "ramping-vus",
    //   exec: 'get_request', // Name of exported JS function to execute. Ex. 'default'
    //
    //   // executor-specific configuration
    //
    //   /** Array of objects that specify the number of VUs to ramp up or down to. */
    //   // Up to 30 looping VUs for 1m20s over 6 stages
    //   stages: [
    //     {
    //       duration: '10s', // Stage duration
    //       target: 10 // Target number of VUs.
    //     },
    //     {
    //       duration: '20s', // Stage duration
    //       target: 20 // Target number of VUs.
    //     },
    //     {
    //       duration: '30s', // Stage duration
    //       target: 30 // Target number of VUs.
    //     },
    //     {
    //       duration: '10s', // Stage duration
    //       target: 10 // Target number of VUs.
    //     }
    //     // Total 1 minutes 10 seconds approx.
    //   ],
    //   startVUs: 5, // Number of VUs to run at test start.
    //   gracefulRampDown: '10s' // Time to wait for an already started iteration to finish before stopping it during a ramp down.
    // },
    // ----------------------------------------------------------------------------------------------------------------------
    // ======================================================================================================================
    // ----------------------------------------------------------------------------------------------------------------------
    // "scenario_name_5": {
    //   // A fixed number of iterations are executed in a specified period of time.
    //   executor: "constant-arrival-rate",

    //   // common scenario configuration
    //   startTime: '1s', // Waiting time before execution starts.
    //   gracefulStop: '5s', // Time to wait for iterations to finish executing before stopping them forcefully.

    //   exec: 'get_request', // Name of exported JS function to execute. Ex. 'default'

    //   // executor-specific configuration ||  ||
    //   rate: 10, // Number of iterations to execute each `timeUnit` period.
    //   timeUnit: '10s', // Period of time to apply the `rate` value.

    //   // So, 10 iterations in 10 seconds means 1 iteration per second.

    //   duration: '30s', // Total scenario duration (excluding `gracefulStop`)
    //   preAllocatedVUs: 5, // Number of VUs to pre-allocate before test start in order to preserve runtime resources.
    //   maxVUs: 15 // Maximum number of VUs to allow during the test run.

    //   // running (10.1s), 02/05 VUs, 9 complete and 0 interrupted iterations
    //   // running (31.6s), 00/05 VUs, 31 complete and 0 interrupted iterations
    //   // 1.00 iterations/s for 30s
    // }
    // ----------------------------------------------------------------------------------------------------------------------
    // ======================================================================================================================
    // ----------------------------------------------------------------------------------------------------------------------
    "scenario_name_6": {
      // A variable number of iterations are executed in a specified period of time.
      executor: "ramping-arrival-rate",

      // common scenario configuration
      startTime: '1s', // Waiting time before execution starts.
      gracefulStop: '5s', // Time to wait for iterations to finish executing before stopping them forcefully.

      exec: 'get_request', // Name of exported JS function to execute. Ex. 'default'

      // executor-specific configuration
      /** Array of objects that specify the number of VUs to ramp up or down to. */
      stages: [
        {
          duration: '10s', // Stage duration
          target: 10 // Target number of VUs.
        },
        {
          duration: '20s', // Stage duration
          target: 20 // Target number of VUs.
        },
        {
          duration: '30s', // Stage duration
          target: 30 // Target number of VUs.
        },
        {
          duration: '10s', // Stage duration
          target: 10 // Target number of VUs.
        }
      ],

      startRate: 300, // Start iterations per `timeUnit`
      timeUnit: '1m', // Start `startRate` iterations per minute
      preAllocatedVUs: 50, // Pre-allocate necessary VUs.

      stages: [
        { target: 300, duration: '1m' }, // Start 300 iterations per `timeUnit` for the first minute.
        { target: 600, duration: '2m' }, // Linearly ramp-up to starting 600 iterations per `timeUnit` over the following two minutes.
        { target: 600, duration: '4m' }, // Continue starting 600 iterations per `timeUnit` for the following four minutes.
        { target: 60, duration: '2m' },  // Linearly ramp-down to starting 60 iterations per `timeUnit` over the last two minutes.
      ],
    }
  },
};

export function get_request() {
  http.get("http://test.k6.io");
}