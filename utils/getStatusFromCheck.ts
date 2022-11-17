import type { Check } from '@onfido/api';

import { CheckResults, CheckResultsStatus } from '../types/CheckResults';

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

const isStatusLoading = (status: CheckResultsStatus): boolean =>
  simplifiedStatus.get(status) === CheckResultsStatus.loading || simplifiedStatus.get(status) === CheckResultsStatus.willTakeLonger;

const getStatusFromCheck = (check: Check): Pick<CheckResults, 'isClear' | 'status'> => {
  const status = check.status as CheckResultsStatus;

  return {
    isClear: check.result === null && isStatusLoading(status) ? null : check.result === 'clear',
    status: simplifiedStatus.get(status) ?? CheckResultsStatus.finished,
  };
};

export default getStatusFromCheck;
