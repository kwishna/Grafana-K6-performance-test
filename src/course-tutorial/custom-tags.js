import http from 'k6/http';
import { check } from 'k6';

/**
 * @type {import('k6/options').Options}
 */
export const options = {
    thresholds: {
        http_req_duration: ['p(95)<300'],
        "http_req_duration{page:order}": ['p(95)<300'],
        "http_req_duration{page:home}": ['p(95)<300']
    }
}

export default function () {
    // home page
    let res = http.get('https://run.mocky.io/v3/cef9ccd3-7768-45f4-ab95-d2edd7f90db6', {
        tags: { page: 'home' },
    });

    check(res, {
        'status is 200': (r) => r.status === 200
    });
    console.log(res.status);

    // order page
    res = http.get('https://run.mocky.io/v3/92e5fe0a-4cf5-4f1d-9356-65410053a22e?mocky-delay=2000ms', {
        tags: { page: 'order' }
    });

    check(res, {
      'status is 201': (r) => r.status === 201
    });
    console.log(res.status);
}

/*
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: ./custom-tags.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

     checks.....................: 100.00%   ✓ 2        ✗ 0
     data_received..............: 3.4 kB  1.2 kB/s
     data_sent..................: 643 B   233 B/s
     http_req_blocked...........: avg=218.23ms min=0s       med=218.23ms max=436.47ms p(90)=392.82ms p(95)=414.65ms
     http_req_connecting........: avg=82.51ms  min=0s       med=82.51ms  max=165.02ms p(90)=148.52ms p(95)=156.77ms
   ✗ http_req_duration..........: avg=1.15s    min=162.8ms  med=1.15s    max=2.15s    p(90)=1.95s    p(95)=2.05s
     ✓ { page:home }............: avg=162.8ms  min=162.8ms  med=162.8ms  max=162.8ms  p(90)=162.8ms  p(95)=162.8ms
     ✗ { page:order }...........: avg=2.15s    min=2.15s    med=2.15s    max=2.15s    p(90)=2.15s    p(95)=2.15s
     http_req_failed............: 0.00% ✓ 0        ✗ 2
     http_req_receiving.........: avg=9.26ms   min=3.49ms   med=9.26ms   max=15.02ms  p(90)=13.87ms  p(95)=14.45ms
     http_req_sending...........: avg=264.55µs min=0s       med=264.55µs max=529.1µs  p(90)=476.19µs p(95)=502.64µs
     http_req_tls_handshaking...: avg=127.95ms min=0s       med=127.95ms max=255.9ms  p(90)=230.31ms p(95)=243.1ms
     http_req_waiting...........: avg=1.15s    min=147.24ms med=1.15s    max=2.15s    p(90)=1.95s    p(95)=2.05s
     http_reqs..................: 2       0.725344/s
     iteration_duration.........: avg=2.75s    min=2.75s    med=2.75s    max=2.75s    p(90)=2.75s    p(95)=2.75s
     iterations.................: 1       0.362672/s
     vus........................: 1       min=1      max=1
     vus_max....................: 1       min=1      max=1


running (00m02.8s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m02.8s/10m0s  1/1 iters, 1 per VU
ERRO[0004] thresholds on metrics 'http_req_duration, http_req_duration{page:order}' have been crossed
*/