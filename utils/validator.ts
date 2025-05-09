import _ from "lodash";

export const requiredValidator = (
  value: unknown,
  message = "وارد کردن فیلد فوق الزامی است"
) => {
  if (typeof value === "number") {
    return true;
  }
  if (
    _.isUndefined(value) ||
    _.isNull(value) ||
    _.isEmpty(value) ||
    value === false
  )
    return message;
  return !!String(value).trim().length || message;
};

export const maxLengthValidator = (value: unknown, maxLength: number) => {
  const valueAsString = String(value);

  return (
    valueAsString.length < maxLength ||
    `طول فیل فوق نمی‌تواند بیش از ${maxLength} کارکتر باشد`
  );
};

export const minLengthValidator = (value: unknown, minLength: number) => {
  const valueAsString = String(value);

  return (
    valueAsString.length > minLength ||
    `طول فیلد فوق نمی‌تواند کمتر از ${minLength} کارکتر باشد`
  );
};

export const minValueValidator = (value: unknown, minValue: number) => {
  const valueAsNumber = Number(value);

  return (
    valueAsNumber >= minValue ||
    `مقدار فیلد فوق نمی‌تواند کمتر از ${minValue} باشد`
  );
};
