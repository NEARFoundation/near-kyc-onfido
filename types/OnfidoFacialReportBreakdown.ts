interface OnfidoFacialReportBreakdown {
  visualAuthenticity?: {
    result: string;
    breakdown?: {
      spoofingDetection?: {
        result: string;
        properties?: unknown;
      };
    };
  };
  imageIntegrity?: {
    result: string;
    breakdown?: {
      sourceIntegrity?: {
        result: string;
        properties?: unknown;
      };
      faceDetected?: {
        result: string;
        properties?: unknown;
      };
    };
  };
  faceComparison?: {
    result: string;
    breakdown?: {
      faceMatch?: {
        result: string;
        properties?: unknown;
      };
    };
  };
}

export default OnfidoFacialReportBreakdown;
