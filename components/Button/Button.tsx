import styles from './Button.module.scss';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

export const Button = ({ className, children, ...props }: ButtonProps): JSX.Element => {
	return (
		<button className={cn(styles.button, className)} {...props}>
			{children}
		</button>
	);
};
