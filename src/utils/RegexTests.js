export const isValidEmail = email => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const isValidPhone = phone => {
  const regex = /^(0|91)?[6-9][0-9]{9}$/;
  return regex.test(phone);
};
