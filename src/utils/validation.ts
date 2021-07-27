export enum ERRORS {
  EMAIL = ' Invalid Email',
  TEXT = 'Too short',
  PHONE = 'Invalid phone number',
  PASSWORD = 'Too simple',
  PASSWORD_CONFIRM = 'Passwords must match',
}

export const validation = (value: string, type: string): { [key: string]: string } => {
  switch (type) {
    case 'password':
      return passwordVerification(value);
    case 'text':
      return textVerification(value);
    case 'email':
      return emailVerification(value);
    case 'tel':
      return telVerification(value);
    default:
      return { value: '', messageError: '' };
  }
};

const passwordVerification = (value: string) => {
  const pattern = /(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}/g;
  const result = value.match(pattern);
  const error = result ? '' : ERRORS.PASSWORD;
  return { value, messageError: error };
};

const textVerification = (value: string) => {
  const error = value.length > 2 ? '' : ERRORS.TEXT;
  return { value, messageError: error };
};

const emailVerification = (value: string) => {
  const pattern = /[^@]+@[a-z]+(\.[a-z]+)/g;
  const result = value.match(pattern);
  const error = result ? '' : ERRORS.EMAIL;
  return { value, messageError: error };
};

const telVerification = (value: string) => {
  const pattern = /(?=.*[0-9]){5,}/g;
  const result = value.match(pattern);
  const error = result ? '' : ERRORS.PHONE;
  return { value, messageError: error };
};
