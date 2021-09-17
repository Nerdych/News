import { withLayout } from '../Layout/Layout';
import { NewsPageComponent } from '../page-components/NewPageComponent/NewPageComponent';
import { News } from '../interfaces/news.interface';
import { domains } from '../helpers/contants';
import { getNews } from '../api/news';
import { getAllNews, getLentaNews, getMosNews } from '../helpers/getNews';

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
