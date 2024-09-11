import http from 'k6/http';
import { sleep } from 'k6';
import { Trend } from 'k6/metrics';

__ENV.K6_OUT="influxdb=localhost:8086"

export let options = {
  vus: 10,
  duration: '10s',
  ext: {
    loadimpact: {
      projectID: "InfluxDB-Project-ID",
      name: "InfluxDB-Test",
    }
  },
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must complete below 500ms
    'http_reqs{expected_response:true}': ['rate>10'],
    'checks':['rate>0.95']
  }
};

export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
