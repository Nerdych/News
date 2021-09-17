import { MouseEvent } from 'react';

export interface PaginationProps {
	page: number;
	numberOfPages: number;
	onClickNumber: (e: MouseEvent<HTMLButtonElement>) => void;
}
