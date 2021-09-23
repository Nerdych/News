import { News } from '../../interfaces/news.interface';

export interface NewsListProps {
	items: News[];
	withImage: boolean;
}
