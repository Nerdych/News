import { ChangeEvent, FormEvent, useState } from 'react';

import styles from './Search.module.scss';
import SearchIcon from '../../public/img/search.svg';
import cn from 'classnames';
import { SearchProps } from './Search.props';

import { Button } from '../Button/Button';
import { Input } from '../Input/Input';

export const Search = ({ className, onSearch, ...props }: SearchProps): JSX.Element => {
	const [value, setValue] = useState<string>('');

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSearch(value);
	};

	return (
		<form className={cn(styles.search, className)} onSubmit={onSubmit} {...props}>
			<Input onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)} />
			<Button className={styles.button} type="submit">
				<SearchIcon />
			</Button>
		</form>
	);
};
