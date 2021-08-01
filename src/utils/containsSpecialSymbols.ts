const format = /^[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/;

export default (str: string) => {
  if (str.match(format)) {
    return true;
  }

  return false;
};
