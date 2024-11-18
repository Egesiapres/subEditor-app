export const formatFromPath = (path: string): string =>
  path.split("/").join(" ");

export const capitalizeFirstChar = (text: string): string =>
  `${text[0].toUpperCase()}${text.slice(1)}`;
