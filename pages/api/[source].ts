import { getAllNews, getLentaNews, getMosNews } from '../../helpers/getNews';

export default async function handler(req, res) {
	let news;

	switch (req.query.source) {
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

	if (req.query.search) {
		news = news.filter(
			item =>
				item.description?._text.toLowerCase().includes(req.query.search.toLowerCase()) ||
				item.title._text.toLowerCase().includes(req.query.search.toLowerCase())
		);
	}

	const numberOfPages = Math.ceil(news.length / req.query.perPage);
	news = news.slice(
		(req.query.page - 1) * req.query.perPage,
		(req.query.page - 1) * req.query.perPage + +req.query.perPage
	);

	res.json(JSON.stringify({ news, numberOfPages }));
}
