import { FetchStatus } from "@bitmetro/create-query";
import dayjs from "dayjs";
import customeParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customeParseFormat);

export const APP_NAME = "Corfu Travel Guide";

export const SETTINGS_WIDTH = 800;

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

export const capitalise = (text = "") =>
  text[0]?.toLocaleUpperCase() + text.substring(1);

export const formatTime = (time: string) =>
  dayjs(time, "HH:mm").format("h:mma");

export const getLowestStatus = (
  stati: Array<FetchStatus | undefined>
): FetchStatus | undefined => {
  if (stati.find((status) => status === "error")) return "error";
  if (stati.find((status) => status === "fetching")) return "fetching";
  if (stati.find((status) => status === undefined)) return undefined;
  if (stati.find((status) => status === "success")) return "success";

  return undefined;
};
