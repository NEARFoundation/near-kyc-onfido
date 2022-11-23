// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { COOKIE_CHECK_ID_NAME } from '../../constants';
import getOnfido from '../../helpers/onfido';
import type { CheckResults } from '../../types/CheckResults';
import { CheckResultsStatus } from '../../types/CheckResults';
import getDocumentValidationFailureDetails from '../../utils/getDocumentValidationFailureDetails';
import getFacialValidationFailureDetails from '../../utils/getFacialValidationFailureDetails';
import getStatusFromCheck from '../../utils/getStatusFromCheck';
import { NOT_FOUND, SERVER_ERROR, SUCCESS } from '../../utils/statusCodes';

const endpointName = 'check-results';

const onfido = getOnfido();
/**
 * @swagger
 * /api/check-results:
 *   get:
 *     description: Get check check status
 *     responses:
 *       200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *               isClear:
 *                 type: boolean
 *                 example: true
 *               status:
 *                 type: string
 *                 example: finished
 *               validationFailureDetails:
 *                 type: array
 *                 items:
 *                   type: string
 *
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<CheckResults | unknown>) {
  try {
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
    const facialReport = reports.find((report) => report.name === 'facial_similarity_photo');

    if (!documentReport || !facialReport) {
      res.status(NOT_FOUND).json({ isClear: null, status: CheckResultsStatus.notFound, validationFailureDetails: [] });
      return;
    }

    const { breakdown: breakdownDocumentReport } = documentReport;
    const documentReportValidationFailureDetails = getDocumentValidationFailureDetails(breakdownDocumentReport);

    const { breakdown: breakdownFacialReport } = facialReport;
    const facialReportValidationFailureDetails = getFacialValidationFailureDetails(breakdownFacialReport);

    const resultStatus = getStatusFromCheck(check);

    res.status(SUCCESS).json({
      ...resultStatus,
      validationFailureDetails: [...documentReportValidationFailureDetails, ...facialReportValidationFailureDetails],
    });
  } catch (error: unknown) {
    console.error({ error });
    res.status(SERVER_ERROR).json(error);
  }
}
