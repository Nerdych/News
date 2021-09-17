import React from 'react';
import styles from './Atag.module.scss';
import { AtagProps } from './Atag.props';
import cn from 'classnames';

const Atag = React.forwardRef(({ children, active = false, className, ...props }: AtagProps, ref): JSX.Element => {
	return (
		<a
			className={cn(styles.a, className, {
				[styles.active]: active,
			})}
			ref={ref}
			{...props}
		>
			{children}
		</a>
	);
});

export default Atag;
