export enum RedeemState {
  Authentication,
  Otp,
  EnterGift,
  NoBrokerProfile,
  ChooseInstruments,
  Success,
}

export enum RedeemStateLabel {
  Authentication = "ورود",
  Otp = "ارسال کد پیامکی",
  EnterGift = "کد و رمز فعال سازی",
  NoBrokerProfile = "عضویت در کارگزاری",
  ChooseInstruments = "انتخاب نماد",
  Success = "موفق",
}
