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

export const NewsPageComponent = ({ news }: NewsPageComponentProps): JSX.Element => {
	const [withImage, setWithImage] = useState<boolean>(false);
	const [sortNews, setSortNews] = useState<News[] | null>(null);

	useEffect(() => {
		setSortNews(news);
		// axios
		// 	.get('https://lenta.ru/rss/news')
		// 	.then(res => xmlParser.xml2json(res.data, { compact: true, spaces: 4 }))
		// 	.then(data => console.log(data));
		// axios
		// 	.get('https://www.mos.ru/rss')
		// 	.then(res => xmlParser.xml2json(res.data, { compact: true, spaces: 4 }))
		// 	.then(data => console.log(data));
	}, []);

	const onClickLenta = () => {
		setSortNews(news.filter(item => item.source === 'www.lenta.ru'));
	};

	const onClickMos = () => {
		setSortNews(news.filter(item => item.source === 'www.mos.ru'));
	};

	const onClickAll = () => {
		setSortNews(news);
	};

	return (
		<div className={styles.news}>
			<Header className={styles.news__header} />
			<div className={styles.news__content}>
				<div className={styles.news__buttons}>
					<div className={styles['news__sort-buttons']}>
						<Link href="/" passHref>
							<Atag active onClick={onClickAll}>
								Все
							</Atag>
						</Link>
						<Link href="/" passHref>
							<Atag onClick={onClickLenta}>Lenta.ru</Atag>
						</Link>
						<Link href="/" passHref>
							<Atag onClick={onClickMos}>Mos.ru</Atag>
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
