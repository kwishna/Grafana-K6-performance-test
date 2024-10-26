import http from 'k6/http';

const username = 'user';
const password = 'passwd';

export default function () {
  // Passing username and password as part of URL and then specifying
  // "ntlm" as auth type will do the trick!
  const credentials = `${username}:${password}`;
  const res = http.get(`http://${credentials}@example.com/`, { auth: 'ntlm' });
}