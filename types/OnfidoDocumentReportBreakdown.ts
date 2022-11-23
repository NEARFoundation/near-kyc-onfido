interface OnfidoDocumentReportBreakdown {
  ageValidation?: {
    result: string;
    breakdown?: unknown;
  };
  policeRecord?: {
    result: string;
  };
  imageIntegrity?: {
    result: string;
    breakdown?: {
      supportedDocument?: {
        result: string;
        properties?: unknown;
      };
      imageQuality?: {
        result: string;
        properties?: unknown;
      };
      [key: string]: unknown;
    };
  };
  dataComparison?: {
    result: string;
    breakdown?: unknown;
  };
  dataConsistency?: {
    result: string;
    breakdown?: {
      documentType?: {
        result: string;
        properties?: unknown;
      };
      [key: string]: unknown;
    };
  };
  compromisedDocument?: {
    result: string;
  };
  visualAuthenticity?: {
    result: string;
    breakdown?: {
      faceDetection?: {
        result: string;
        properties?: unknown;
      };
      fonts?: {
        result: string;
        properties?: unknown;
      };
      securityFeatures?: {
        result: string;
        properties?: unknown;
      };
      [key: string]: unknown;
    };
  };
  dataValidation?: {
    result: string;
    breakdown?: {
      mrz?: {
        result: string;
        properties?: unknown;
      };
      documentNumbers?: {
        result: string;
        properties?: unknown;
      };
      [key: string]: unknown;
    };
  };
}

export default OnfidoDocumentReportBreakdown;
