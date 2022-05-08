import otpGenerator from "otp-generator";

export const generateOtp = (length = 6) => {
  return otpGenerator.generate(length, {
    upperCaseAlphabets: false,
    specialChars: false,
  });
};
