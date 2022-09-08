export const currentTime = () => {
  return new Date().getTime();
};

export function getNumber(num) {
  try {
    return Number(num);
  } catch (err) {
    return -1;
  }
}