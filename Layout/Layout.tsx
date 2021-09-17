import { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.scss';

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<>
			<main className={styles.main}>{children}</main>
		</>
	);
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
};
