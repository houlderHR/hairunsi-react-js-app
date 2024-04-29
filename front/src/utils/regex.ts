export const REGEX_EMAIL = /^.+@(hairun-technology)+\.(com)$/;

export const matchingExpression = (text: string, regex: RegExp) => regex.test(text);

export const matchingEmail = (email: string) => matchingExpression(email, REGEX_EMAIL);