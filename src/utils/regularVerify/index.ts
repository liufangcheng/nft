import regulars from './regulars';

export default {
  isEmail: (value) => regulars.email.test(value),
  isPhoneNumber: (value) => regulars.phoneNumber.test(value),
  isUsername: (value) => regulars.username.test(value),
  isInteger: (value) => regulars.integer.test(value),
  isDecimal: (value) => regulars.decimal.test(value),
};
