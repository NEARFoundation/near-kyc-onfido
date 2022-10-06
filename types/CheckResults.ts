export interface CheckResults {
  isClear: boolean | null;
  status: CheckResultsStatus;
}

export enum CheckResultsStatus {
  loading = 'loading',
  manual = 'manual',
  complete = 'complete',
}
