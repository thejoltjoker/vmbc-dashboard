export const camelCaseToTitleCase = (input: string) => {
	// Use a regular expression to split the input string at uppercase letters
	// and then use the map function to capitalize the first letter of each word
	return input
		.split(/(?=[A-Z])/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

export const camelCaseToKebabCase = (input: string) => {
	// Use regular expressions to replace capital letters with '-[lowercase]'
	return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
};
