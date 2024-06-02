const { exec } = require('child_process');
const path = require('path');

// Path to the k6 script
const k6ScriptPath = path.resolve(__dirname, 'code--001.js');

// Execute the k6 script
exec(`k6 run ${k6ScriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing k6: ${error}`);
    return;
  }

  // Output results
  console.log(`k6 stdout: ${stdout}`);
  console.error(`k6 stderr: ${stderr}`);
});

/*
PS F:\ABD\GitHub\k6-learn> node .\src\course-tutorial\programmatic-run.js
k6 stdout:
          /\      |‾‾| /‾‾/   /‾‾/
     /\  /  \     |  |/  /   /  /
    /  \/    \    |     (   /   ‾‾\
   /          \   |  |\  \ |  (‾)  |
  / __________ \  |__| \__\ \_____/ .io

     execution: local
        script: F:\ABD\GitHub\k6-learn\src\course-tutorial\code--001.js
        output: -

     scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
              * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m01.0s), 1/1 VUs, 0 complete and 0 interrupted iterations
default   [   0% ] 1 VUs  00m01.0s/10m0s  0/1 iters, 1 per VU

     data_received..................: 17 kB 9.7 kB/s
     data_sent......................: 442 B 252 B/s
     http_req_blocked...............: avg=524.71ms min=524.71ms med=524.71ms max=524.71ms p(90)=524.71ms p(95)=524.71ms
     http_req_connecting............: avg=233.84ms min=233.84ms med=233.84ms max=233.84ms p(90)=233.84ms p(95)=233.84ms
     http_req_duration..............: avg=227.07ms min=227.07ms med=227.07ms max=227.07ms p(90)=227.07ms p(95)=227.07ms
       { expected_response:true }...: avg=227.07ms min=227.07ms med=227.07ms max=227.07ms p(90)=227.07ms p(95)=227.07ms
     http_req_failed................: 0.00% ✓ 0        ✗ 1
     http_req_receiving.............: avg=3.39ms   min=3.39ms   med=3.39ms   max=3.39ms   p(90)=3.39ms   p(95)=3.39ms
     http_req_sending...............: avg=95.9µs   min=95.9µs   med=95.9µs   max=95.9µs   p(90)=95.9µs   p(95)=95.9µs
     http_req_tls_handshaking.......: avg=280.56ms min=280.56ms med=280.56ms max=280.56ms p(90)=280.56ms p(95)=280.56ms
     http_req_waiting...............: avg=223.58ms min=223.58ms med=223.58ms max=223.58ms p(90)=223.58ms p(95)=223.58ms
     http_reqs......................: 1     0.570362/s
     iteration_duration.............: avg=1.75s    min=1.75s    med=1.75s    max=1.75s    p(90)=1.75s    p(95)=1.75s
     iterations.....................: 1     0.570362/s
     vus............................: 1     min=1      max=1
     vus_max........................: 1     min=1      max=1


running (00m01.8s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [ 100% ] 1 VUs  00m01.8s/10m0s  1/1 iters, 1 per VU

k6 stderr: 
*/