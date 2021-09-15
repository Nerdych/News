import styles from './Htag.module.scss';
import { HtagProps } from './Htag.props';

export const Htag = ({ level = 1, className, children, ...props }: HtagProps): JSX.Element => {
	switch (level) {
		case 1: {
			return (
				<h1 className={`${styles.h1} ${className}`} {...props}>
					{children}
				</h1>
			);
		}
		case 2: {
			return (
				<h2 className={`${styles.h2} ${className}`} {...props}>
					{children}
				</h2>
			);
		}
		default:
			return <></>;
	}
};
