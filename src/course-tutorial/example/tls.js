import http from 'k6/http';
import { check } from 'k6';

export const options = {
  tlsCipherSuites: ['TLS_RSA_WITH_RC4_128_SHA', 'TLS_RSA_WITH_AES_128_GCM_SHA256'],
  tlsVersion: {
    min: 'ssl3.0',
    max: 'tls1.2',
  },
};

export default function () {
  const res = http.get('https://sha256.badssl.com');
  check(res, {
    'is TLSv1.2': (r) => r.tls_version === http.TLS_1_2,
    'is sha256 cipher suite': (r) => r.tls_cipher_suite === 'TLS_RSA_WITH_AES_128_GCM_SHA256',
  });
}