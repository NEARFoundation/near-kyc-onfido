// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getOnfido } from '../../helpers/onfido';

type ApplicantTokenPair = {
  applicantId: string;
  sdkToken: string;
};

const onfido = getOnfido();

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApplicantTokenPair>) {
  const applicantProperties = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    dob: '1990-01-22',
  }; // https://documentation.onfido.com/#applicant-object // TODO Get from request payload
  const applicant = await onfido.applicant.create(applicantProperties);

  console.log({ applicant });

  const sdkToken = await onfido.sdkToken.generate({
    applicantId: applicant.id,
    // referrer: 'http://localhost/**'
    // crossDeviceUrl: "https://example.com"
  });
  const result = { applicantId: applicant.id, sdkToken };
  console.log({ result });

  res.status(200).json(result);
}
