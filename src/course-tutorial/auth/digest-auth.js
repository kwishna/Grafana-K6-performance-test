import http from 'k6/http';
import { check } from 'k6';

const username = 'user';
const password = 'passwd';

export default function () {
  // Passing username and password as part of URL plus the auth option will
  // authenticate using HTTP Digest authentication.
  const credentials = `${username}:${password}`;
  const res = http.get(
    `https://${credentials}@httpbin.test.k6.io/digest-auth/auth/${username}/${password}`,
    {
      auth: 'digest',
    }
  );

  // Verify response (checking the echoed data from the httpbin.test.k6.io digest auth
  // test API endpoint)
  check(res, {
    'status is 200': (r) => r.status === 200,
    'is authenticated': (r) => r.json().authenticated === true,
    'is correct user': (r) => r.json().user === username,
  });
}