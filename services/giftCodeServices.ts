import type {
  DefaultResponse,
  InstrumentDataItem,
  ValidateData,
} from "~/types/ApiResponse";

export const getInstruments = async (dsCode: string, giftCode: string) => {
  try {
    const response = await $api<DefaultResponse<Array<InstrumentDataItem>>>(
      "/api/giftcodes/instruments",
      {
        method: "GET",
        query: { dsCode, giftCode },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const redeemGift = async (
  pin: string,
  dsCode: string,
  giftCode: string,
  instrumentId: string
) => {
  try {
    await $api("/api/giftcodes/redeem", {
      method: "POST",
      body: {
        pin,
        dsCode,
        giftCode,
        // TODO : Temporary Hardcoded
        instruments: [{ id: instrumentId, percentage: 100 }],
      },
    });
  } catch (error) {
    throw error;
  }
};

export const validateGift = async (
  pin: string,
  dsCode: string,
  giftCode: string
) => {
  try {
    const response = await $api<DefaultResponse<ValidateData>>(
      "/api/giftcodes/validate",
      {
        method: "POST",
        body: { pin, dsCode, giftCode },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
