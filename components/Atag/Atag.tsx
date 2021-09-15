import React from 'react';
import styles from './Atag.module.scss';
import { AtagProps } from './Atag.props';

export const Atag = React.forwardRef(
	({ children, active = false, className, ...props }: AtagProps, ref): JSX.Element => {
		return (
			<a className={`${styles.a} ${className} ${active ? 'active' : null}`} ref={ref} {...props}>
				{children}
			</a>
		);
	}
);
