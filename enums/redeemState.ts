export enum RedeemState {
    Authentication,
    Otp,
    EnterPin,
    NoBrokerProfile,
    ChooseInstruments,
    Success
}

export enum RedeemStateLabel {
    Authentication = "ورود",
    Otp = "ارسال کد پیامکی",
    EnterPin = "رمز کارت هدیه",
    NoBrokerProfile = "عضویت در کارگزاری",
    ChooseInstruments = "انتخاب نماد",
    Success = "موفق"
}