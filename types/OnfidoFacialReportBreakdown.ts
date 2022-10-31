interface OnfidoFacialReportBreakdown {
  visualAuthenticity?: {
    result: string;
    breakdown?: {
      spoofingDetection?: {
        result: string;
      };
    };
  };
  imageIntegrity?: {
    result: string;
    breakdown?: {
      sourceIntegrity?: {
        result: string;
      };
      faceDetected?: {
        result: string;
      };
    };
  };
  faceComparison?: {
    result: string;
    breakdown?: {
      faceMatch?: {
        result: string;
      };
    };
  };
}

export default OnfidoFacialReportBreakdown;
