// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OnfidoApiError } from '@onfido/api';
import type { NextApiRequest, NextApiResponse } from 'next';

import { COOKIE_NUMBER_OF_TRIES_NAME, COOKIES_EXPIRATION_TIME, MAX_NUMBER_OF_TRIES } from '../../constants';
import getOnfido from '../../helpers/onfido';
import type ApplicantProperties from '../../types/ApplicantProperties';
import type ApplicantTokenPair from '../../types/ApplicantTokenPair';
import { FORBIDDEN, SERVER_ERROR, SUCCESS } from '../../utils/statusCodes';

const endpointName = 'generate-token';

const onfido = getOnfido();

/**
 * @swagger
 * /api/generate-token:
 *   post:
 *     description: Create and return an applicant and sdk token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              email:
 *                type: string
 *              dob:
 *                type: string
 *              csrf_token:
 *                type: string
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                applicantId:
 *                  type: string
 *                sdkToken:
 *                  type: string
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ApplicantTokenPair | unknown>) {
  try {
    const ipAddress = req.headers['x-real-ip'] ?? req.connection.remoteAddress;

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
    const ZERO = '0';
    const ONE = 1;
    const numberOfTriesString = req.cookies[COOKIE_NUMBER_OF_TRIES_NAME] ?? ZERO;
    const numberOfTries = parseInt(numberOfTriesString, 10);

    if (numberOfTries >= MAX_NUMBER_OF_TRIES) {
      res.status(FORBIDDEN).json({ status: 'Maximum number of tries reached' });
      return;
    }

    const sdkToken = await onfido.sdkToken.generate({
      applicantId: applicant.id,
      // referrer: 'http://localhost/**'
      // crossDeviceUrl: "https://example.com"
    });
    const result = { applicantId: applicant.id, sdkToken };
    const newNumberOfTries = numberOfTries + ONE;

    res.setHeader('Set-Cookie', [`${COOKIE_NUMBER_OF_TRIES_NAME}=${newNumberOfTries}; Path=/; Max-Age=${COOKIES_EXPIRATION_TIME}`]);

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
