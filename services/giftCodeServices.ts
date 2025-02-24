import type {
  DefaultResponse,
  GiftCodeDetailsData,
  ValidateData,
} from "~/types/ApiResponse";
import { InstrumentPortion } from "~/types/Types";

export const getGiftCodeDetails = async (dsCode: string, giftCode: string) => {
  try {
    const response: DefaultResponse<GiftCodeDetailsData> = await $api(
      "/api/giftcodes/details",
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
  instruments: Array<InstrumentPortion>
) => {
  try {
    await $api("/api/giftcodes/redeem", {
      method: "POST",
      body: {
        pin,
        dsCode,
        giftCode,
        // TODO : Temporary Hardcoded
        instruments,
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
