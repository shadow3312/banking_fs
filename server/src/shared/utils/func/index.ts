function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check email format
  if (!emailRegex.test(email)) {
    return false;
  }

  return true;
}

const validateEmail: IValidateEmail = Object.freeze({
  isValidEmail: (email: string) => isValidEmail(email),
});

export default validateEmail;
