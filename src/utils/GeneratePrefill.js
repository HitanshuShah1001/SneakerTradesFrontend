export const generatePrefill = user => ({
  email: user?.Email,
  contact: `91${user?.Phone}`,
  name: user?.Name,
});
