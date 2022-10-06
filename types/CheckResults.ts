export interface CheckResults {
  isClear: boolean | null; // !isClear means the check failed
  status: CheckResultsStatus;
}

export enum CheckResultsStatus {
  willTakeLonger = 'will-take-longer',
  finished = 'finished',
  notFound = 'not-found',
}
