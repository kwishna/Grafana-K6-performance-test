import { sleep } from 'k6';
import http from 'k6/http';

import {
  randomIntBetween,
  randomString,
  randomItem,
  uuidv4,
  findBetween,
} from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export default function () {
  const res = http.post(`https://test-api.k6.io/user/register/`, {
    first_name: randomItem(['Joe', 'Jane']), // random name
    last_name: `Jon${randomString(1, 'aeiou')}s`, //random character from given list
    username: `user_${randomString(10)}@example.com`, // random email address,
    password: uuidv4(), // random password in form of uuid
  });

  // find a string between two strings to grab the username:
  const username = findBetween(res.body, '"username":"', '"');
  console.log('username from response: ' + username);

  sleep(randomIntBetween(1, 5)); // sleep between 1 and 5 seconds.
}