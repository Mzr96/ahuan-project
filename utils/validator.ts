import _ from "lodash";

export const requiredValidator = (
  value: unknown,
  message = "وارد کردن فیلد فوق الزامی است"
) => {
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
    valueAsString.length > maxLength ||
    `طول فیل فوق نمی‌تواند بیش از ${maxLength} کارکتر باشد`
  );
};

export const minLengthValidator = (value: unknown, minLength: number) => {
  const valueAsString = String(value);

  return (
    valueAsString.length < minLength ||
    `طول فیلد فوق نمی‌تواند کمتر از ${minLength} کارکتر باشد`
  );
};

export const betweenLengthValidator = (
  value: unknown,
  minLength: number,
  maxLength: number
) => {
  const valueAsString = String(value);

  return (
    (valueAsString.length >= minLength && valueAsString.length <= maxLength) ||
    `طول فیلد فوق نمی‌تواند کمتر از ${minLength} و بیش از ${maxLength} کارکتر باشد`
  );
};

export const lengthValidator = (value: unknown, requiredLength: number) => {
  const valueAsString = String(value);

  return (
    valueAsString.length === requiredLength ||
    `فیلد فوق باید شامل ${requiredLength} کارکتر باشد`
  );
};
