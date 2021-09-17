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

	res.json(JSON.stringify(news));
}
