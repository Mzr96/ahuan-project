import type { InstrumentCategory } from "~/enums/InstrumentCategory";
import type { RegistertionState } from "~/enums/registerationState";

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
  description?: string;
  category: InstrumentCategory;
}

export interface GiftCodeDetailsData {
  amount: number;
  instruments: Array<InstrumentDataItem>;
}

export interface ValidateData {
  isValid: boolean;
}

export interface IsSignUpData {
  customerRegistrationStatus: RegistertionState;
}
