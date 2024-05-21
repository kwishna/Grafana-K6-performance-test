import http from 'k6/http';
import { Trend, Rate, Counter, Gauge } from 'k6/metrics';
import { sleep } from 'k6';

export const TrendRTT = new Trend('RTT');
export const RateContentOK = new Rate('ContentOK');
export const GaugeContentSize = new Gauge('ContentSize');
export const CounterErrors = new Counter('Errors');
export const options = {
  thresholds: {
    //
    // -----------------------------------------------
    // metric_name: [
    //   {
    //     threshold: 'p(99) < 10', // string
    //     abortOnFail: true,       // boolean
    //     delayAbortEval: '10s',   // string
    //   },
    // ],
    // -----------------------------------------------
    //
    // http errors should be less than 1%
    http_req_failed: ['rate<0.01'], 
    // Multiple Threshold -- 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
    // http_req_duration: [{ threshold: 'p(99) < 10', abortOnFail: true }], // Abort On Fail.
    // 
    // the rate of successful checks should be higher than 90%
    checks: ['rate>0.9'],
    // Count: Incorrect content cannot be returned more than 99 times.
    'Errors': ['count<100'],
    // Gauge: returned content must be smaller than 4000 bytes
    'ContentSize': ['value<4000'],
    // Rate: content must be OK more than 95 times
    'ContentOK': ['rate>0.95'],
    // Trend: Percentiles, averages, medians, and minimums
    // must be within specified milliseconds.
    'RTT': ['p(99)<300', 'p(70)<250', 'avg<200', 'med<150', 'min<100'],
  }
};

export default function () {
  const res = http.get('https://test-api.k6.io/public/crocodiles/1/');
  const contentOK = res.json('name') === 'Bert';

  TrendRTT.add(res.timings.duration);
  RateContentOK.add(contentOK);
  GaugeContentSize.add(res.body.length);
  CounterErrors.add(!contentOK);

  sleep(1);
}
