import styles from './Search.module.scss';
import { SearchProps } from './Search.props';
import searchIcon from '../../public/img/search.svg';

import Image from 'next/image';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { ChangeEvent, FormEvent, useState } from 'react';

export const Search = ({ className, onSearch, ...props }: SearchProps): JSX.Element => {
	const [value, setValue] = useState<string>('');

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSearch(value);
	};

	return (
		<form className={`${styles.search} ${className}`} onSubmit={onSubmit} {...props}>
			<Input
				className={styles.search__input}
				onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
			/>
			<Button className={styles.search__button} type="submit">
				<Image src={searchIcon} alt="Поиск" />
			</Button>
		</form>
	);
};
