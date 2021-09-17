import { getNews } from '../apiFunctions/news';
import { domains } from './contants';

export const getMosNews = async () => {
	let items = await getNews(domains.mos);
	return (items = items.rss.channel.item.map(item => ({ ...item, source: 'www.mos.ru' })));
};

export const getLentaNews = async () => {
	let items = await getNews(domains.lenta);

	items = items.rss.channel.item.map(item => ({
		...item,
		source: 'www.lenta.ru',
		description: item.description ? { _text: item.description._cdata } : { _text: '' },
	}));

	return items;
};

export const getAllNews = async () => {
	const newsLenta = await getLentaNews();
	const newsMos = await getMosNews();
	return [...newsLenta, ...newsMos].sort((a, b) => {
		return new Date(a.pubDate._text) < new Date(b.pubDate._text) ? 1 : -1;
	});
};
