import type VerificationFailure from './VerificationFailure';

export interface CheckResults {
  isClear: boolean | null; // !isClear means the check failed
  status: CheckResultsStatus;
  validationFailureDetails: VerificationFailure[];
}

export enum CheckResultsStatus {
  loading = 'loading',
  willTakeLonger = 'will-take-longer',
  finished = 'finished',
  notFound = 'not-found',
}
