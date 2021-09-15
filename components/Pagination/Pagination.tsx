import styles from './Pagination.module.scss';
import { PaginationProps } from './Pagination.props';

export const Pagination = ({ ...props }: PaginationProps): JSX.Element => {
	return <div className={styles.pagination}>1 2 3 4 5</div>;
};
