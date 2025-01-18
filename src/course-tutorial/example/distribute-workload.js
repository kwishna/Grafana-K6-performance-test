import http from 'k6/http';
import exec from 'k6/execution';

export const options = {
  scenarios: {
    quickRamp: {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      timeUnit: '1s',
      preAllocatedVUs: 100,
      stages: [
        { target: 10, duration: '10s' },
        { target: 10, duration: '15s' },
        { target: 0, duration: '5s' },
      ],
    },
  },
};

export default function () {
  if (exec.vu.idInTest % 10 < 4) {
    // 0-3 range, read the news
    http.get('http://test.k6.io/news');
  } else if (exec.vu.idInTest % 10 < 7) {
    // 4-6 range, bet heads
    http.get('http://test.k6.io/flip_coin.php?bet=heads');
  } else {
    // 7-9 range, bet tails
    http.get('http://test.k6.io/flip_coin.php?bet=tails');
  }
}