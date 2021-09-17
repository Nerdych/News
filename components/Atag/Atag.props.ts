import { ReactNode, AnchorHTMLAttributes } from 'react';

export interface AtagProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
	children: ReactNode;
	active?: boolean;
}
