export const msToSeconds = (
  milliseconds: number,
  isDecimals: boolean = false
): number => {
  let result = milliseconds / 1000;

  result = isDecimals ? result : Math.floor(result);

  return result;
};

export const secondsToMs = (seconds: number): number =>
  Math.floor(seconds * 1000);
