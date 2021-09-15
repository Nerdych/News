import styles from './Header.module.scss';
import update from '../../public/img/update.svg';

import { HeaderProps } from './Header.props';

import Image from 'next/image';
import { Htag } from '../Htag/Htag';
import { Button } from '../Button/Button';
import { Search } from '../Search/Search';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	return (
		<header className={`${styles.header} ${className}`} {...props}>
			<Htag className={styles.header__title} level={1}>
				Список новостей
			</Htag>
			<Button className={styles.header__button}>
				<Image src={update} alt="Обновить" />
			</Button>
			<Search className={styles.header__search} />
		</header>
	);
};
