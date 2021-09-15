import styles from './Search.module.scss';
import { SearchProps } from './Search.props';
import searchIcon from '../../public/img/search.svg';

import Image from 'next/image';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	return (
		<form className={`${styles.search} ${className}`} {...props}>
			<Input className={styles.search__input} />
			<Button className={styles.search__button}>
				<Image src={searchIcon} alt="Поиск" />
			</Button>
		</form>
	);
};
