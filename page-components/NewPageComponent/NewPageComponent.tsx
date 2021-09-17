import { MouseEvent, useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/dist/client/router';

import styles from './NewPageComponent.module.scss';
import WithoutImageIcon from '../../public/img/withoutImage.svg';
import WithImageIcon from '../../public/img/withImage.svg';
import cn from 'classnames';
import { NewsPageComponentProps } from './NewPageComponent.props';
import { News } from '../../interfaces/news.interface';
import { getAllNews, getLentaNews, getMosNews } from '../../helpers/getNews';

import Link from 'next/link';
import { Header } from '../../components/Header/Header';
import Atag from '../../components/Atag/Atag';
import { NewsList } from '../../components/NewsList/NewsList';
import { Pagination } from '../../components/Pagination/Pagination';
import { Button } from '../../components/Button/Button';
import axios from 'axios';
import { mainDomain } from '../../helpers/contants';

export const NewsPageComponent = ({ news }: NewsPageComponentProps): JSX.Element => {
	const router: NextRouter = useRouter();
	const [withImage, setWithImage] = useState<boolean>(false);
	const [allNews, setAllNews] = useState<News[]>(news);
	const [sortNews, setSortNews] = useState<News[] | null>(null);
	const [pagination, setPagination] = useState({ currentPage: 1, perPage: 4 });
	const [loading, setLoading] = useState<boolean>(false);
	const [filter, setFilter] = useState<string>('');

	useEffect(() => {
		if (filter.length) {
			setAllNews(news);
			searchNews(filter, news);
		} else {
			setSortNews(null);
			setAllNews(news);
		}

		setPagination(prev => ({ ...prev, currentPage: 1 }));
	}, [news]);

	useEffect(() => {
		searchNews(filter, allNews);
	}, [filter]);

	const searchNews = (str: string, elements: News[]) => {
		if (!str.length) {
			setSortNews(null);
			return;
		}
		setSortNews(
			elements.filter(
				item =>
					item.description?._text.toLowerCase().includes(str.toLowerCase()) ||
					item.title._text.toLowerCase().includes(str.toLowerCase())
			)
		);
	};

	const updateNews = async () => {
		setLoading(true);
		let newNews;

		switch (router.query.source) {
			case 'mos':
				newNews = await axios.get(mainDomain + '/mos');
				break;
			case 'lenta':
				newNews = await axios.get(mainDomain + '/lenta');
				break;
			case 'all':
				newNews = await axios.get(mainDomain + '/all');
				break;
			default:
				break;
		}

		setAllNews(newNews.data);
		setPagination(prev => ({ ...prev, currentPage: 1 }));
		setLoading(false);
	};

	const onClickPagination = (e: MouseEvent<HTMLButtonElement>) => {
		const page = e.currentTarget.dataset.page ?? 1;
		setPagination(prev => ({ ...prev, currentPage: +page }));
	};

	const onClickSearch = (str: string) => {
		fetch('http://localhost:3000/api/mos');
		setFilter(str);
	};

	return (
		<div className={styles.news}>
			<Header className={styles.header} onSearch={onClickSearch} onUpdate={updateNews} />
			<div className={styles.content}>
				<div className={styles.buttonsWrapper}>
					<div className={styles.sortButtonsWrapper}>
						<Link href="/all" passHref>
							<Atag active={router.query.source === 'all'}>Все</Atag>
						</Link>
						<Link href="/lenta" passHref>
							<Atag active={router.query.source === 'lenta'}>Lenta.ru</Atag>
						</Link>
						<Link href="/mos" passHref>
							<Atag active={router.query.source === 'mos'}>Mos.ru</Atag>
						</Link>
					</div>

					<div className={styles.viewButtonsWrapper}>
						<Button onClick={() => setWithImage(true)} className={cn({ [styles.active]: withImage })}>
							<WithImageIcon />
						</Button>
						<Button onClick={() => setWithImage(false)} className={cn({ [styles.active]: !withImage })}>
							<WithoutImageIcon />
						</Button>
					</div>
				</div>

				{loading ? (
					<>Загрузка...</>
				) : (
					<>
						<NewsList
							page={pagination.currentPage}
							perPage={pagination.perPage}
							items={sortNews ?? allNews}
							withImage={withImage}
						/>
						<Pagination
							page={pagination.currentPage}
							numberOfPages={Math.ceil((sortNews?.length ?? allNews.length) / pagination.perPage)}
							onClickNumber={onClickPagination}
						/>
					</>
				)}
			</div>
		</div>
	);
};
