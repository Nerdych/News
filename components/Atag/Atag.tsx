import React, { ForwardedRef } from 'react';
import styles from './Atag.module.scss';
import { AtagProps } from './Atag.props';
import cn from 'classnames';

const Atag = React.forwardRef(
	(
		{ children, active = false, className, ...props }: AtagProps,
		ref: ForwardedRef<HTMLAnchorElement>
	): JSX.Element => {
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
	}
);

Atag.displayName = 'Atag';
export default Atag;
