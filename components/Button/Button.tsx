import styles from './Button.module.scss';
import { ButtonProps } from './Button.props';

export const Button = ({ className, children, ...props }: ButtonProps): JSX.Element => {
	return (
		<button className={`${styles.button} ${className}`} {...props}>
			{children}
		</button>
	);
};
