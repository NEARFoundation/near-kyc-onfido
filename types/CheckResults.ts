import type ValidationFailure from './ValidationFailure';

export interface CheckResults {
  isClear: boolean | null; // !isClear means the check failed
  status: CheckResultsStatus;
  validationFailureDetails: ValidationFailure[];
}

export enum CheckResultsStatus {
  loading = 'loading',
  willTakeLonger = 'will-take-longer',
  finished = 'finished',
  notFound = 'not-found',
}
