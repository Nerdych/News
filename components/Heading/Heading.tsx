import styles from './Heading.module.scss';
import { HtagProps } from './Heading.props';
import cn from 'classnames';

export const Htag = ({ level = 1, className, children, ...props }: HtagProps): JSX.Element => {
	switch (level) {
		case 1: {
			return (
				<h1 className={cn(styles.h1, className)} {...props}>
					{children}
				</h1>
			);
		}
		case 2: {
			return (
				<h2 className={cn(styles.h2, className)} {...props}>
					{children}
				</h2>
			);
		}
		default:
			return <></>;
	}
};
