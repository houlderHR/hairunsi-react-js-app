export const REGEX_EMAIL = /^.+@(hairun-technology)+\.(com)$/;

export const matchingExpression = (text: string, regex: RegExp) => regex.test(text);

export const matchingEmail = (email: string) => matchingExpression(email, REGEX_EMAIL);
export const REGEX_MAIL_HAIRUN = /^[^\s@]+@hairun-technology\.com$/i;
export const REGEX_ID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/;
