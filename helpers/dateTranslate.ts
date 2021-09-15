export const dateTranslate = (date: Date) => {
	const formatter = new Intl.DateTimeFormat('ru', {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
	});

	return formatter.format(date);
};
