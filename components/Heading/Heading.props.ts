import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface HtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement> {
	level?: 1 | 2;
	children: ReactNode;
}
