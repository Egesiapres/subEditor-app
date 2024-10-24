export const msToSeconds = (milliseconds, isDecimals = false) => {
  let result = milliseconds / 1000;

  result = isDecimals ? result : Math.floor(result);

  return result;
};

export const secondsToMs = seconds => Math.floor(seconds * 1000);
