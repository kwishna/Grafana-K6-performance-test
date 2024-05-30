import http from "k6/http";
import { check, sleep } from "k6";
import { Options } from "k6/options";

export const options: Options = {

  scenarios: {
      "scenario_name": {
        executor: "shared-iterations",
        startTime: '2s', // Waiting time before execution starts.
        gracefulStop: '2s',
        vus: 2,
        iterations: 10
      }
  },
};

// Simulated user behavior
export default function () {
  let res = http.get("http://test.k6.io");
  // Validate response status
  check(res, { "status was 200": (r) => r.status == 200 });
  sleep(1);
}