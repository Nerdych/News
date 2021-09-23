import { useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/dist/client/router';

import styles from './NewPageComponent.module.scss';
import WithoutImageIcon from '../../public/img/withoutImage.svg';
import WithImageIcon from '../../public/img/withImage.svg';
import cn from 'classnames';
import axios from 'axios';
import { NewsPageComponentProps } from './NewPageComponent.props';
import { News } from '../../interfaces/news.interface';
import { mainDomain } from '../../helpers/contants';

import Link from 'next/link';
import Atag from '../../components/Atag/Atag';
import { Header } from '../../components/Header/Header';
import { NewsList } from '../../components/NewsList/NewsList';
import { Pagination } from '../../components/Pagination/Pagination';
import { Button } from '../../components/Button/Button';
import { convertJSONToUrlEncoded } from '../../helpers/urlEncoded';

export const NewsPageComponent = ({ news, numberOfPages }: NewsPageComponentProps): JSX.Element => {
	const router: any = useRouter();
	const [withImage, setWithImage] = useState<boolean>(false);
	const [allNews, setAllNews] = useState<News[]>(news);
	const [loading, setLoading] = useState<boolean>(false);
	const [filter, setFilter] = useState<string>('');

	useEffect(() => {
		setAllNews(news);
	}, [news]);

	useEffect(() => {
		router.push(
			`/${router.query.source}${convertJSONToUrlEncoded({ page: 1, perPage: 4, search: filter ?? null })}`
		);
	}, [filter]);

	const updateNews = async () => {
		if (+router.query.page === 1) {
			setLoading(true);
			let newNews;

			let urlApi: string = mainDomain + router.asPath;

			newNews = await axios.get(urlApi);

			setAllNews(newNews.data.news);
			setLoading(false);
		} else {
			router.push(
				`/${router.query.source}${convertJSONToUrlEncoded({ page: 1, perPage: 4, search: filter ?? null })}`
			);
		}
	};

	const onClickSearch = (str: string) => {
		setFilter(str);
	};

	const createUrl = page => {
		let urlLink = `/${router.query.source}${convertJSONToUrlEncoded({
			page: page,
			perPage: 4,
			search: filter ?? null,
		})}`;

		return urlLink;
	};

	return (
		<div className={styles.news}>
			<Header className={styles.header} onSearch={onClickSearch} onUpdate={updateNews} />
			<div className={styles.content}>
				<div className={styles.buttonsWrapper}>
					<div className={styles.sortButtonsWrapper}>
						<Link
							href={`/all${convertJSONToUrlEncoded({ page: 1, perPage: 4, search: filter ?? null })}`}
							passHref
						>
							<Atag active={router.query.source === 'all'}>Все</Atag>
						</Link>
						<Link
							href={`/lenta${convertJSONToUrlEncoded({ page: 1, perPage: 4, search: filter ?? null })}`}
							passHref
						>
							<Atag active={router.query.source === 'lenta'}>Lenta.ru</Atag>
						</Link>
						<Link
							href={`/mos${convertJSONToUrlEncoded({ page: 1, perPage: 4, search: filter ?? null })}`}
							passHref
						>
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
						<NewsList items={allNews} withImage={withImage} />
						<Pagination page={+router.query.page} numberOfPages={numberOfPages} createUrl={createUrl} />
					</>
				)}
			</div>
		</div>
	);
};
