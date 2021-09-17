import { withLayout } from '../Layout/Layout';
import { NewsPageComponent } from '../page-components/NewPageComponent/NewPageComponent';
import { News } from '../interfaces/news.interface';
import { domains } from '../helpers/contants';
import { getNews } from '../apiFunctions/news';

const NewsPage = ({ news }: NewsPageProps): JSX.Element => {
	return <NewsPageComponent news={news} />;
};

export const getServerSideProps = async ({ query }) => {
	let news;

	switch (query.source) {
		case 'mos': {
			news = await getMosNews();
			break;
		}
		case 'lenta': {
			news = await getLentaNews();
			break;
		}
		case 'all': {
			news = await getAllNews();
			break;
		}
	}

	return {
		props: {
			news,
		},
	};
};

export const getMosNews = async () => {
	let items = await getNews(domains.mos);
	return (items = items.rss.channel.item.map(item => ({ ...item, source: 'www.mos.ru' })));
};

export const getLentaNews = async () => {
	let items = await getNews(domains.lenta);
	return items.rss.channel.item.map(item => ({
		...item,
		source: 'www.lenta.ru',
		description: item.description?._cdata && { _text: item.description._cdata },
	}));
};

export const getAllNews = async () => {
	const newsLenta = await getLentaNews();
	const newsMos = await getMosNews();
	return [...newsLenta, ...newsMos].sort((a, b) => {
		return new Date(a.pubDate._text) < new Date(b.pubDate._text) ? 1 : -1;
	});
};

interface NewsPageProps extends Record<string, unknown> {
	news: News[];
}

export default withLayout(NewsPage);
