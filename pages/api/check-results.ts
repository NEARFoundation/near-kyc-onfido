// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { COOKIE_NAME } from '../../constants';
import getOnfido from '../../helpers/onfido';
import type { CheckResults } from '../../types/CheckResults';
import { CheckResultsStatus } from '../../types/CheckResults';

const endpointName = 'check-results';

const onfido = getOnfido();

export default async function handler(req: NextApiRequest, res: NextApiResponse<CheckResults>) {
  console.log(`[${endpointName}] Request received`);

  const checkId = req.cookies[COOKIE_NAME];
  const check = await onfido.check.find(checkId);

  if (!checkId || !check) {
    res.status(404).json({ isClear: null, status: CheckResultsStatus.notFound });
    return;
  }

  // List of status: https://documentation.onfido.com/#report-status
  // List of results: https://documentation.onfido.com/#report-results
  const simplifiedStatus = new Map([
    ['awaiting_data', CheckResultsStatus.willTakeLonger],
    ['awaiting_approval', CheckResultsStatus.willTakeLonger],
    ['complete', CheckResultsStatus.finished],
    ['cancelled', CheckResultsStatus.finished],
    ['withdrawn', CheckResultsStatus.finished],
    ['paused', CheckResultsStatus.willTakeLonger],
  ]);

  res.status(200).json({
    isClear: check.result === null ? null : check.result === 'clear',
    status: simplifiedStatus.get(check.status) ?? CheckResultsStatus.finished,
  });
}
