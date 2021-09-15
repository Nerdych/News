import axios from 'axios';
import xmlParser from 'xml-js';

export const getNews = async (url: string) => {
	return await axios
		.get(url)
		.then(res => xmlParser.xml2json(res.data, { compact: true, spaces: 4 }))
		.then(data => JSON.parse(data));
};
