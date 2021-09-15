import styles from './NewsList.module.scss';
import { NewsListProps } from './NewsList.props';

import { Atag } from '../Atag/Atag';
import { Htag } from '../Htag/Htag';
import { Card } from '../Card/Card';
import { dateTranslate } from '../../helpers/dateTranslate';

export const NewsList = ({ items = [], withImage }: NewsListProps): JSX.Element => {
	return (
		<div className={`${styles.news} ${withImage ? styles['news--with-image'] : null}`}>
			{items.map((item, index) => (
				<Card className={styles.news__item} key={index}>
					{withImage && item.enclosure?._attributes && (
						<div className={styles['news__item-img']}>
							<img src={item.enclosure?._attributes.url} />
						</div>
					)}

					<div className={styles['news__item-content']} onClick={() => console.log(item)}>
						<Htag level={2}>
							<Atag href={item.link._text} target="_blank">
								{item.title._text}
							</Atag>
						</Htag>
						{item.description && <p>{item.description._text}</p>}
						{!withImage && (
							<Atag className={styles['news__item-button--blue']} href={item.link._text} target="_blank">
								Подробнее
							</Atag>
						)}
					</div>

					<div className={styles['news__item-footer']}>
						<Atag className={styles['news__item-button--gray']}>{item.source}</Atag>
						<span className={styles['news__item-date']}>{dateTranslate(new Date(item.pubDate._text))}</span>
					</div>
				</Card>
			))}
		</div>
	);
};
