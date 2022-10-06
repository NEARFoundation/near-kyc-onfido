export interface CheckResults {
  isClear: boolean;
  status: CheckResultsStatus;
}

export enum CheckResultsStatus {
  loading = 'loading',
  manual = 'manual',
  complete = 'complete',
}
