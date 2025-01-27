export interface DefaultResponse<TData> {
  data: TData;
  isSuccess: boolean;
  error?: Error;
  metadata?: string;
}

export interface ErrorResponse {
  message: string;
  code: string;
  traceCode: string;
}

export interface authenticationData {
  accessToken: string;
  refreshToken: string;
}

export interface InstrumentDataItem {
  id: string;
  name: string;
  abbreviation: string;
  maxCode: string;
  bourseAccountCode: string;
  onlineBourseAccountCode: string;
}

export interface ValidateData {
  isValid: boolean;
}

export interface IsSignUpData {
  isCustomer: boolean;
}
