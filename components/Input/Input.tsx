import styles from './Input.module.scss';
import { InputProps } from './Input.props';

export const Input = ({ className, ...props }: InputProps): JSX.Element => {
	return <input {...props} className={`${styles.input} ${className}`} />;
};
