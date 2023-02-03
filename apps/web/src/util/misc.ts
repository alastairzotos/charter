export const APP_NAME = "CorfuBooking";

export const pluralize = (
  num: number,
  item: string | { singular: string; plural: string }
) =>
  typeof item === "string"
    ? num === 1
      ? item
      : `${item}s`
    : num === 1
    ? item.singular
    : item.plural;

export const shortenText = (text: string, length: number) =>
  text.length <= length ? text : text.substring(0, length) + "...";
