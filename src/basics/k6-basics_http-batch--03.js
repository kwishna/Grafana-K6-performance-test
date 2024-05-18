import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const responses = http.batch([
    ['GET', 'https://test.k6.io', null, { tags: { ctype: 'html' } }],
    ['GET', 'https://test.k6.io/style.css', null, { tags: { ctype: 'css' } }],
    ['GET', 'https://test.k6.io/images/logo.png', null, { tags: { ctype: 'images' } }],
  ]);
  check(responses[0], {
    'main page status was 200': (res) => res.status === 200,
  });
}

/*
    scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
          * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

     ✓ main page status was 200

     checks.........................: 100.00% ✓ 1        ✗ 0
     data_received..................: 29 kB   32 kB/s
     data_sent......................: 1.4 kB  1.5 kB/s
     http_req_blocked...............: avg=536.54ms min=536.21ms med=536.21ms max=537.21ms p(90)=537.01ms p(95)=537.11ms
     http_req_connecting............: avg=229.98ms min=229.98ms med=229.98ms max=229.98ms p(90)=229.98ms p(95)=229.98ms
     http_req_duration..............: avg=239.16ms min=237.99ms med=239.75ms max=239.75ms p(90)=239.75ms p(95)=239.75ms
       { expected_response:true }...: avg=239.75ms min=239.75ms med=239.75ms max=239.75ms p(90)=239.75ms p(95)=239.75ms
     http_req_failed................: 66.66%  ✓ 2        ✗ 1
     http_req_receiving.............: avg=3.22ms   min=0s       med=103.5µs  max=9.55ms   p(90)=7.66ms   p(95)=8.61ms
     http_req_sending...............: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_tls_handshaking.......: avg=296.6ms  min=296.27ms med=296.27ms max=297.27ms p(90)=297.07ms p(95)=297.17ms
     http_req_waiting...............: avg=235.94ms min=228.43ms med=239.64ms max=239.75ms p(90)=239.73ms p(95)=239.74ms
     http_reqs......................: 3       3.338521/s
     iteration_duration.............: avg=887.62ms min=887.62ms med=887.62ms max=887.62ms p(90)=887.62ms p(95)=887.62ms
     iterations.....................: 1       1.11284/s

  running (00m00.9s), 0/1 VUs, 1 complete and 0 interrupted iterations
  default ✓ [======================================] 1 VUs  00m00.9s/10m0s  1/1 iters, 1 per VU
*/