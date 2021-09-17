import styles from './Header.module.scss';

import { HeaderProps } from './Header.props';
import UpdateIcon from '../../public/img/update.svg';
import cn from 'classnames';

import { Htag } from '../Heading/Heading';
import { Button } from '../Button/Button';
import { Search } from '../Search/Search';

export const Header = ({ className, onSearch, onUpdate, ...props }: HeaderProps): JSX.Element => {
	return (
		<header className={cn(styles.header, className)} {...props}>
			<div className={styles.leftSide}>
				<Htag className={styles.title} level={1}>
					Список новостей
				</Htag>
				<Button className={styles.button} onClick={onUpdate}>
					<UpdateIcon />
				</Button>
			</div>
			<div className={styles.rightSide}>
				<Search onSearch={onSearch} className={styles.search} />
			</div>
		</header>
	);
};
