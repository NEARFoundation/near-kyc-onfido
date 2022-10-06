// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { COOKIE_USER_DATA_NAME, COOKIES_EXPIRATION_TIME } from '../../constants';
import getOnfido from '../../helpers/onfido';

type ApplicantTokenPair = {
  applicantId: string;
  sdkToken: string;
};

const endpointName = 'generate-token';

const onfido = getOnfido();

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApplicantTokenPair>) {
  const applicantProperties = req.body; // https://documentation.onfido.com/#applicant-object
  console.log('Starting', endpointName);
  const applicant = await onfido.applicant.create(applicantProperties);

  console.log('Applicant created', endpointName);

  const sdkToken = await onfido.sdkToken.generate({
    applicantId: applicant.id,
    // referrer: 'http://localhost/**'
    // crossDeviceUrl: "https://example.com"
  });
  const result = { applicantId: applicant.id, sdkToken };

  console.log('Storing user data in cookies');
  res.setHeader('Set-Cookie', `${COOKIE_USER_DATA_NAME}=${JSON.stringify(applicantProperties)}; Max-Age=${COOKIES_EXPIRATION_TIME}; Path=/`);

  console.log('Returning result', endpointName);
  res.status(200).json(result);
}
