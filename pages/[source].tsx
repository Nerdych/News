import axios from 'axios';
import { withLayout } from '../Layout/Layout';
import { NewsPageComponent } from '../page-components/NewPageComponent/NewPageComponent';
import xmlParser from 'xml-js';
import { News } from '../interfaces/news.interface';
import { domains } from '../helpers/contants';

const NewsPage = ({ news }: NewsPageProps): JSX.Element => {
	return <NewsPageComponent news={news} />;
};

export const getServerSideProps = async ({ query }) => {
	const fetchUrl = async (url: string) => {
		return await axios
			.get(url)
			.then(res => xmlParser.xml2json(res.data, { compact: true, spaces: 4 }))
			.then(data => JSON.parse(data));
	};

	let news = await fetchUrl(domains[query.source]);

	switch (query.source) {
		case 'mos': {
			news = news.rss.channel.item.map(item => ({ ...item, source: 'www.mos.ru' }));
			break;
		}
		case 'lenta': {
			news = news.rss.channel.item.map(item => ({
				...item,
				source: 'www.lenta.ru',
				description: { _text: item.description._cdata },
			}));
			break;
		}
	}

	return {
		props: {
			news,
		},
	};
};

interface NewsPageProps extends Record<string, unknown> {
	news: News[];
}

export default withLayout(NewsPage);
