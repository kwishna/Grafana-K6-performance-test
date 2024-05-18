import http from 'k6/http';

export default function () {
  const url = 'http://test.k6.io/login';
  const payload = JSON.stringify({
    email: 'admin',
    password: 'admin',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}

/*
     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)

     data_received..................: 6.1 kB 4.7 kB/s
     data_sent......................: 740 B  570 B/s
     http_req_blocked...............: avg=405.24ms min=245.02ms med=405.24ms max=565.46ms p(90)=533.42ms p(95)=549.44ms
     http_req_connecting............: avg=241.03ms min=234.8ms  med=241.03ms max=247.25ms p(90)=246ms    p(95)=246.63ms
     http_req_duration..............: avg=229.44ms min=226.15ms med=229.44ms max=232.74ms p(90)=232.08ms p(95)=232.41ms
       { expected_response:true }...: avg=232.74ms min=232.74ms med=232.74ms max=232.74ms p(90)=232.74ms p(95)=232.74ms
     http_req_failed................: 50.00% ✓ 1        ✗ 1
     http_req_receiving.............: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
     http_req_sending...............: avg=485.1µs  min=0s       med=485.1µs  max=970.2µs  p(90)=873.18µs p(95)=921.69µs
     http_req_tls_handshaking.......: avg=159.04ms min=0s       med=159.04ms max=318.08ms p(90)=286.27ms p(95)=302.17ms
     http_req_waiting...............: avg=228.96ms min=226.15ms med=228.96ms max=231.77ms p(90)=231.21ms p(95)=231.49ms
     http_reqs......................: 2      1.539499/s
     iteration_duration.............: avg=1.29s    min=1.29s    med=1.29s    max=1.29s    p(90)=1.29s    p(95)=1.29s
     iterations.....................: 1      0.76975/s
     vus............................: 1      min=1      max=1
     vus_max........................: 1      min=1      max=1


running (00m01.3s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [======================================] 1 VUs  00m01.3s/10m0s  1/1 iters, 1 per VU
*/
