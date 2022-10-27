// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import util from 'util'; // this is temporary

import { COOKIE_CHECK_ID_NAME } from '../../constants';
import getOnfido from '../../helpers/onfido';
import type { CheckResults } from '../../types/CheckResults';
import { CheckResultsStatus } from '../../types/CheckResults';
import getValidationFailureDetails from '../../utils/getValidationFailureDetails';
import { NOT_FOUND, SUCCESS } from '../../utils/statusCodes';

const endpointName = 'check-results';

const onfido = getOnfido();

export default async function handler(req: NextApiRequest, res: NextApiResponse<CheckResults>) {
  console.log(`[${endpointName}] Request received`);

  const checkId = req.cookies[COOKIE_CHECK_ID_NAME];

  if (!checkId) {
    res.status(NOT_FOUND).json({ isClear: null, status: CheckResultsStatus.notFound, validationFailureDetails: [] });
    return;
  }

  const check = await onfido.check.find(checkId);

  if (!check) {
    res.status(NOT_FOUND).json({ isClear: null, status: CheckResultsStatus.notFound, validationFailureDetails: [] });
    return;
  }

  const reports = await onfido.report.list(checkId);
  const documentReport = reports.find((report) => report.name === 'document');

  if (!documentReport) {
    res.status(NOT_FOUND).json({ isClear: null, status: CheckResultsStatus.notFound, validationFailureDetails: [] });
    return;
  }

  const { breakdown } = documentReport;
  const validationFailureDetails = getValidationFailureDetails(breakdown);

  console.log('Temp to delete', { validationFailureDetails });
  console.log(util.inspect(breakdown, false, null, true /* enable colors */));

  // List of status: https://documentation.onfido.com/#check-status
  // List of results: https://documentation.onfido.com/#check-results
  const simplifiedStatus = new Map([
    ['in_progress', CheckResultsStatus.loading],
    ['awaiting_applicant', CheckResultsStatus.finished],
    ['complete', CheckResultsStatus.finished],
    ['withdrawn', CheckResultsStatus.finished],
    ['paused', CheckResultsStatus.willTakeLonger],
    ['reopened', CheckResultsStatus.willTakeLonger],
  ]);

  // This need to be updated / improved depending on the answer from the support
  res.status(SUCCESS).json({
    isClear: check.result === null ? null : check.result === 'clear',
    status: simplifiedStatus.get(check.status) ?? CheckResultsStatus.finished,
    validationFailureDetails,
  });
}
