export const generateUniqueId = (): string => {
  const timestamp = Date.now().toString(16); // Convert current timestamp to hexadecimal
  const randomPart = Math.floor(Math.random() * 1000000).toString(16); // Generate a random number and convert to hexadecimal
  return `${timestamp}-${randomPart}`;
};
