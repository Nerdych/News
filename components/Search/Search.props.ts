import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SearchProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
	onSearch: (str: string) => void;
}
