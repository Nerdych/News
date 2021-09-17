import styles from './NewsList.module.scss';
import { NewsListProps } from './NewsList.props';
import { dateTranslate } from '../../helpers/dateTranslate';
import cn from 'classnames';

import Atag from '../Atag/Atag';
import { Htag } from '../Heading/Heading';
import { Card } from '../Card/Card';

export const NewsList = ({ items = [], page, perPage, withImage }: NewsListProps): JSX.Element => {
	return (
		<div className={cn(styles.news, [{ [styles.withImage]: withImage }])}>
			{!items.length && <>Новостей нет</>}
			{items.slice(perPage * page - perPage, perPage * page).map((item, index) => (
				<Card className={styles.item} key={index}>
					{withImage && item.enclosure?._attributes && (
						<div className={styles.imgWrapper}>
							<img src={item.enclosure?._attributes.url} alt={item.title._text} />
						</div>
					)}

					<div className={styles.content}>
						<Htag className={styles.title} level={2}>
							<Atag href={item.link._text} target="_blank">
								{item.title._text}
							</Atag>
						</Htag>
						{item.description && <p>{item.description._text}</p>}
						{!withImage && (
							<Atag className={styles.blueButton} href={item.link._text} target="_blank">
								Подробнее
							</Atag>
						)}
					</div>

					<div className={styles.footer}>
						<Atag className={styles.grayButton} href={'https://' + item.source} target="_blank">
							{item.source}
						</Atag>
						<span className={styles.date}>{dateTranslate(new Date(item.pubDate._text))}</span>
					</div>
				</Card>
			))}
		</div>
	);
};
