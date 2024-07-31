import http from 'k6/http';
import { Trend, Metric } from 'k6/metrics';

const myTrend = new Trend('waiting_time');

export default function () {
  const res = http.get('https://httpbin.test.k6.io');
  myTrend.add(res.timings.waiting);
  console.log(myTrend.name);
}

// Custom summary to output avg and std
export function handleSummary(data) {
    console.log('Request Duration (ms):');
    console.log(` - avg: ${JSON.stringify(data.metrics.http_req_duration.values)}`);

    const max = data.metrics.http_req_duration.values.max;
    const avg = data.metrics.http_req_duration.values.avg;
    const min = data.metrics.http_req_duration.values.min;
    const med = data.metrics.http_req_duration.values.med;
    const len = data.metrics.http_reqs;

    console.log(calculateStandardDeviation(avg, min, med, max, len));

    return {};
  }

  function calculateStandardDeviation(avg, min, median, max, len) {
    // Calculate the mean
    const mean = avg;

    // Calculate the variance
    const variance = (1 / (data.length - 1)) * data.reduce((acc, current) => acc + Math.pow(current - mean, 2), 0);

    // Calculate the standard deviation
    const stdDev = Math.sqrt(variance);

    return stdDev;
}