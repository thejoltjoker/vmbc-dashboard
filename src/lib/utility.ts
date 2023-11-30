import moment from "moment";
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

export const timeAgo = (timestamp: string): moment.Duration => {
  const momentObject = moment(timestamp);
  const duration = moment.duration(moment().diff(momentObject));
  return duration;
};

export const timeAgoString = (timestamp: string): string => {
  const momentObject = moment(timestamp);
  const duration = moment.duration(moment().diff(momentObject));

  const days: number = duration.asDays();
  const hours: number = duration.asHours();
  const minutes: number = duration.asMinutes();
  const seconds: number = duration.asSeconds();

  if (days > 1) {
    return `${Math.floor(days)} days ago`;
  } else if (hours > 1) {
    return `${Math.floor(hours)} hours ago`;
  } else if (minutes > 1) {
    return `${Math.floor(minutes)} minutes ago`;
  } else {
    return `${Math.floor(seconds)} seconds ago`;
  }
};
