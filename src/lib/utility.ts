import { formatDistanceToNow, differenceInMilliseconds } from "date-fns";
import _ from "lodash";

export const camelCaseToTitleCase = (input: string) => {
  // Use a regular expression to split the input string at uppercase letters
  // and then use the map function to capitalize the first letter of each word
  return input
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const camelCaseToKebabCase = (input: string) => {
  // Use regular expressions to replace capital letters with '-[lowercase]'
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

export const timeAgo = (timestamp: string): number => {
  const date = new Date(timestamp);
  const millisecondsDiff = differenceInMilliseconds(new Date(), date);
  return millisecondsDiff;
};

export const timeAgoString = (timestamp: string): string => {
  const date = new Date(timestamp);
  const timeAgo = _.capitalize(formatDistanceToNow(date, { addSuffix: true }));

  return timeAgo;
};
