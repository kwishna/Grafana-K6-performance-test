import http from 'k6/http';
import { AWSConfig, SignatureV4 } from 'https://jslib.k6.io/aws/0.11.0/signature.js';

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,

  /**
   * Optional session token for temporary credentials.
   */
  sessionToken: __ENV.AWS_SESSION_TOKEN,
});

export default function () {
  /**
   * Create a signer instance with the AWS credentials.
   * The signer will be used to sign the request.
   */
  const signer = new SignatureV4({
    service: 's3',
    region: awsConfig.region,
    credentials: {
      accessKeyId: awsConfig.accessKeyId,
      secretAccessKey: awsConfig.secretAccessKey,
      sessionToken: awsConfig.sessionToken,
    },
  });

  /**
   * Use the signer to prepare a signed request.
   * The signed request can then be used to send the request to the AWS API.
   */
  const signedRequest = signer.sign(
    {
      method: 'GET',
      protocol: 'https',
      hostname: 'test-jslib-aws.s3.us-east-1.amazonaws.com',
      path: '/bonjour.txt',
      headers: {},
      uriEscapePath: false,
      applyChecksum: false,
    },
    {
      signingDate: new Date(),
      signingService: 's3',
      signingRegion: 'us-east-1',
    }
  );

  /**
   * The `signedRequest` object contains the signed request URL and headers.
   * We can use them to send the request to the AWS API.
   */
  http.get(signedRequest.url, { headers: signedRequest.headers });
}