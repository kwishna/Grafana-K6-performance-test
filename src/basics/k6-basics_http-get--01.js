import http from 'k6/http';

export default function () {
  http.get('http://test.k6.io',
    {
      tags: {
        name: "GetRequest"
      }
    }
  );
}

/*
    scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
    default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

    data_received..................: 17 kB 13 kB/s
    data_sent......................: 546 B 396 B/s
    http_req_blocked...............: avg=398.66ms min=268.01ms med=398.66ms max=529.3ms  p(90)=503.17ms p(95)=516.24ms
    http_req_connecting............: avg=245.81ms min=235.13ms med=245.81ms max=256.48ms p(90)=254.35ms p(95)=255.42ms
    http_req_duration..............: avg=257.64ms min=245.14ms med=257.64ms max=270.13ms p(90)=267.63ms p(95)=268.88ms
      { expected_response:true }...: avg=257.64ms min=245.14ms med=257.64ms max=270.13ms p(90)=267.63ms p(95)=268.88ms
    http_req_failed................: 0.00% ✓ 0        ✗ 2
    http_req_receiving.............: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
    http_req_sending...............: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
    http_req_tls_handshaking.......: avg=147.08ms min=0s       med=147.08ms max=294.16ms p(90)=264.74ms p(95)=279.45ms
    http_req_waiting...............: avg=257.64ms min=245.14ms med=257.64ms max=270.13ms p(90)=267.63ms p(95)=268.88ms
    http_reqs......................: 2     1.450244/s
    iteration_duration.............: avg=1.36s    min=1.36s    med=1.36s    max=1.36s    p(90)=1.36s    p(95)=1.36s
    iterations.....................: 1     0.725122/s
    vus............................: 1     min=1      max=1
    vus_max........................: 1     min=1      max=1

    running (00m01.4s), 0/1 VUs, 1 complete and 0 interrupted iterations
    default ✓ [======================================] 1 VUs  00m01.4s/10m0s  1/1 iters, 1 per VU
*/