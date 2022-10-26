// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OnfidoApiError } from '@onfido/api';
import type { NextApiRequest, NextApiResponse } from 'next';

import getOnfido from '../../helpers/onfido';
import type ApplicantProperties from '../../types/ApplicantProperties';
import type ApplicantTokenPair from '../../types/ApplicantTokenPair';
import { SERVER_ERROR, SUCCESS } from '../../utils/statusCodes';

const endpointName = 'generate-token';

const onfido = getOnfido();

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApplicantTokenPair | unknown>) {
  try {
    const ipAddress = req.headers['x-real-ip'] ?? req.connection.remoteAddress;
    console.log(ipAddress);

    const applicantProperties: ApplicantProperties = {
      ...req.body,
      location: {
        ipAddress,
      },
      consents: [
        {
          name: 'privacy_notices_read',
          granted: true,
        },
      ],
    }; // https://documentation.onfido.com/#applicant-object

    console.log('Starting', endpointName);
    const applicant = await onfido.applicant.create(applicantProperties);

    console.log('Applicant created', endpointName);

    const sdkToken = await onfido.sdkToken.generate({
      applicantId: applicant.id,
      // referrer: 'http://localhost/**'
      // crossDeviceUrl: "https://example.com"
    });
    const result = { applicantId: applicant.id, sdkToken };

    console.log('Returning result', endpointName);
    res.status(SUCCESS).json(result);
  } catch (error: unknown | OnfidoApiError) {
    if (error instanceof OnfidoApiError) {
      // An error response was received from the Onfido API, extra info is available.
      console.error(error.message);
      console.error(error.type);
      console.error(error.isClientError());
    } else {
      // No response was received for some reason e.g. a network error.
      console.error({ error });
    }
    res.status(SERVER_ERROR).json(error);
  }
}
