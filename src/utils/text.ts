export const formatFromPath = path => path.split("/").join(" ");

export const capitalizeFirstChar = string =>
  `${string[0].toUpperCase()}${string.slice(1)}`;
