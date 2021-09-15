import styles from './Button.module.scss';
import { ButtonProps } from './Button.props';

export const Button = ({ className, children, ...props }: ButtonProps): JSX.Element => {
	return (
		<button {...props} className={`${styles.button} ${className}`}>
			{children}
		</button>
	);
};
