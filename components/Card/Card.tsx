import styles from './Card.module.scss';
import { CardProps } from './Card.props';

export const Card = ({ children, className, ...props }: CardProps): JSX.Element => {
	return (
		<div className={`${styles.card} ${className}`} {...props}>
			{children}
		</div>
	);
};
