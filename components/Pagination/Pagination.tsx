import styles from './Pagination.module.scss';
import { PaginationProps } from './Pagination.props';
import cn from 'classnames';
import React from 'react';
import Atag from '../Atag/Atag';
import Link from 'next/link';

export const Pagination = ({ page, numberOfPages, createUrl }: PaginationProps): JSX.Element => {
	const createButton = num => {
		if (num < 1 || num > numberOfPages) return <React.Fragment key={num} />;
		return (
			<Link href={createUrl(num)} key={num}>
				<Atag
					className={cn(styles.a, {
						[styles.active]: page === num,
					})}
					data-page={num}
				>
					{num}
				</Atag>
			</Link>
		);
	};

	const pagesCalculate = () => {
		if (page - 2 <= 0) {
			const array = new Array(4).fill('').map((_, index) => createButton(index + 1));

			if (numberOfPages >= 6) {
				array.push(
					<span className={styles.ellipsis} key="...">
						...
					</span>
				);
				array.push(createButton(numberOfPages));
			}

			if (numberOfPages === 5) {
				array.push(createButton(numberOfPages));
			}

			return array;
		}

		if (page + 2 >= numberOfPages) {
			return new Array(5).fill('').map((_, index) => createButton(numberOfPages - 4 + index));
		}

		const array = new Array(3).fill('').map((_, index) => createButton(page + index - 2));
		array.push(createButton(page + 1));
		array.push(
			<span className={styles.ellipsis} key="...">
				...
			</span>
		);
		array.push(createButton(numberOfPages));
		return array;
	};

	return <div className={styles.pagination}>{pagesCalculate()}</div>;
};
