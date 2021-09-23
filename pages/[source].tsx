import { withLayout } from '../Layout/Layout';
import { NewsPageComponent } from '../page-components/NewPageComponent/NewPageComponent';
import { News } from '../interfaces/news.interface';
import { mainDomain } from '../helpers/contants';
import axios from 'axios';

const NewsPage = ({ items: { news, numberOfPages } }: NewsPageProps): JSX.Element => {
	return <NewsPageComponent news={news} numberOfPages={numberOfPages} />;
};

export const getServerSideProps = async ({ query }) => {
	let news;

	switch (query.source) {
		case 'mos': {
			news = await getMosNews(query.page, query.perPage, query.search);
			break;
		}
		case 'lenta': {
			news = await getLentaNews(query.page, query.perPage, query.search);
			break;
		}
		case 'all': {
			news = await getAllNews(query.page, query.perPage, query.search);
			break;
		}
	}

	return {
		props: {
			items: news,
		},
	};
};

const getMosNews = async (page, perPage, search) => {
	let url = `/mos?page=${page}&perPage=${perPage}`;

	if (search) {
		url = url + `&search=${encodeURIComponent(search)}`;
	}

	let items = await axios.get(mainDomain + url);
	return items.data;
};

const getLentaNews = async (page, perPage, search) => {
	let url = `/lenta?page=${page}&perPage=${perPage}`;
	if (search) {
		url = url + `&search=${encodeURIComponent(search)}`;
	}

	let items = await axios.get(mainDomain + url);
	return items.data;
};

const getAllNews = async (page, perPage, search) => {
	let url = `/all?page=${page}&perPage=${perPage}`;
	if (search) {
		url = url + `&search=${encodeURIComponent(search)}`;
	}

	let items = await axios.get(mainDomain + url);
	return items.data;
};

interface NewsPageProps extends Record<string, unknown> {
	items: {
		news: News[];
		numberOfPages: number;
	};
}

export default withLayout(NewsPage);
