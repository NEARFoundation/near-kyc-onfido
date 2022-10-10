// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { OnfidoApiError } from '@onfido/api';
import type { NextApiRequest, NextApiResponse } from 'next';

import { COOKIE_CHECK_ID_NAME, COOKIES_EXPIRATION_TIME } from '../../constants';
import getOnfido from '../../helpers/onfido';
import type ApplicantTokenPair from '../../types/ApplicantTokenPair';
import { SERVER_ERROR, SUCCESS } from '../../utils/statusCodes';

const reportNames = [
  'document',
  // 'document_with_address_information',
  // 'document_with_driving_licence_information',
  // 'facial_similarity_photo',
  // 'facial_similarity_video',
  // 'known_faces',
  // 'identity_enhanced',
  // 'watchlist_enhanced',
  // 'watchlist_standard',
  // 'watchlist_peps_only',
  // 'watchlist_sanctions_only',
  // 'proof_of_address',
  // 'right_to_work'
];

const endpointName = 'create-check';

const onfido = getOnfido();

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApplicantTokenPair | unknown>) {
  const { applicantId } = req.body;
  console.log('Starting', endpointName);
  try {
    const check = await onfido.check.create({
      // https://documentation.onfido.com/#check-object
      applicantId,
      reportNames,
    });

    console.log('Storing check id in cookies');
    res.setHeader('Set-Cookie', `${COOKIE_CHECK_ID_NAME}=${check.id}; Max-Age=${COOKIES_EXPIRATION_TIME}; Path=/`);

    console.log('Returning result', endpointName);
    res.status(SUCCESS).json(check);
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
