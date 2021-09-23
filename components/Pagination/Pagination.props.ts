export interface PaginationProps {
	page: number;
	numberOfPages: number;
	createUrl: (page: number) => string;
}
