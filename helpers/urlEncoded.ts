export const convertJSONToUrlEncoded = (obj: Object) => {
	let str: string[] = [];
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			if (obj[key]) {
				str.push(key + '=' + obj[key]);
			}
		}
	}
	return '?' + str.join('&');
};
