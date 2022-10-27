interface OnfidoReportBreakdown {
  ageValidation?: {
    result: string;
  };
  policeRecord?: {
    result: string;
  };
  imageIntegrity?: {
    result: string;
    breakdown?: {
      supportedDocument?: {
        result: string;
      };
      imageQuality?: {
        result: string;
      };
    };
  };
  dataComparison?: {
    result: string;
  };
  dataConsistency?: {
    result: string;
  };
  compromisedDocument?: {
    result: string;
  };
  visualAuthenticity?: {
    result: string;
    breakdown?: {
      faceDetection?: {
        result: string;
      };
      fonts?: {
        result: string;
      };
      securityFeatures?: {
        result: string;
      };
    };
  };
  dataValidation?: {
    result: string;
  };
}

export default OnfidoReportBreakdown;
