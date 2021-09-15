import axios from 'axios';
import { withLayout } from '../Layout/Layout';
import { NewsPageComponent } from '../page-components/NewPageComponent/NewPageComponent';
import xmlParser from 'xml-js';
import { News } from '../interfaces/news.interface';

const NewsPage = ({ news }: NewsPageProps): JSX.Element => {
	return <NewsPageComponent news={news} />;
};

export const getServerSideProps = async () => {
	let newsMos = await axios
		.get('https://www.mos.ru/rss')
		.then(res => xmlParser.xml2json(res.data, { compact: true, spaces: 4 }))
		.then(data => JSON.parse(data));

	newsMos = newsMos.rss.channel.item.map(item => ({ ...item, source: 'www.mos.ru' }));

	let newsLenta = await axios
		.get('https://lenta.ru/rss/news')
		.then(res => xmlParser.xml2json(res.data, { compact: true, spaces: 4 }))
		.then(data => JSON.parse(data));

	newsLenta = newsLenta.rss.channel.item.map(item => ({
		...item,
		source: 'www.lenta.ru',
		description: { _text: item.description._cdata },
	}));

	const news = [...newsLenta, ...newsMos].sort((a, b) => {
		return new Date(a.pubDate._text) < new Date(b.pubDate._text) ? 1 : -1;
	});

	return {
		props: {
			news: news,
		},
	};
};

interface NewsPageProps extends Record<string, unknown> {
	news: News[];
}

export default withLayout(NewsPage);
