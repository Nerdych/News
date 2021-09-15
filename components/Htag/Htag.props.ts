import { ReactNode, DetailedHTMLProps, HTMLAttributes } from 'react';

export interface HtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadElement> {
	level?: 1 | 2;
	children: ReactNode;
}
