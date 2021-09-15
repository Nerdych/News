import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './NewPageComponent.module.scss';
import withoutImageIcon from '../../public/img/withoutImage.svg';
import withImageIcon from '../../public/img/withImage.svg';
import xmlParser from 'xml-js';
import { NewsPageComponentProps } from './NewPageComponent.props';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '../../components/Header/Header';
import { Atag } from '../../components/Atag/Atag';
import { NewsList } from '../../components/NewsList/NewsList';
import { Pagination } from '../../components/Pagination/Pagination';
import { Button } from '../../components/Button/Button';
import { News } from '../../interfaces/news.interface';
import { NextRouter, useRouter } from 'next/dist/client/router';
import { domains } from '../../helpers/contants';
import { getNews } from '../../api/news';

export const NewsPageComponent = ({ news }: NewsPageComponentProps): JSX.Element => {
	const router: NextRouter = useRouter();
	const [withImage, setWithImage] = useState<boolean>(false);
	const [sortNews, setSortNews] = useState<News[] | null>(null);

	useEffect(() => {
		setSortNews(news);
	}, [news]);

	const searchNews = (str: string) => {
		setSortNews(news.filter(item => item.description?._text.includes(str) || item.title._text.includes(str)));
	};

	const updateNews = () => {
		getNews(domains[router.query.source]);
	};

	return (
		<div className={styles.news}>
			<Header className={styles.news__header} onSearch={searchNews} onUpdate={updateNews} />
			<div className={styles.news__content}>
				<div className={styles.news__buttons}>
					<div className={styles['news__sort-buttons']}>
						<Link href="/" passHref>
							<Atag active>Все</Atag>
						</Link>
						<Link href="/lenta" passHref>
							<Atag>Lenta.ru</Atag>
						</Link>
						<Link href="/mos" passHref>
							<Atag>Mos.ru</Atag>
						</Link>
					</div>

					<div className={styles['news__view-buttons']}>
						<Button onClick={() => setWithImage(true)}>
							<Image src={withImageIcon} alt="C картиноками" />
						</Button>
						<Button onClick={() => setWithImage(false)}>
							<Image src={withoutImageIcon} alt="Без картинок" />
						</Button>
					</div>
				</div>

				<NewsList items={sortNews ?? news} withImage={withImage} />

				<Pagination />
			</div>
		</div>
	);
};
