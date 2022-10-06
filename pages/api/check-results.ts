// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import type { CheckResults } from '../../types/CheckResults';
import { CheckResultsStatus } from '../../types/CheckResults';

// import getOnfido from '../../helpers/onfido';

// const endpointName = 'check-results';

// const onfido = getOnfido();

export default async function handler(req: NextApiRequest, res: NextApiResponse<CheckResults>) {
  res.status(200).json({
    isClear: false,
    status: CheckResultsStatus.loading,
  });
}
