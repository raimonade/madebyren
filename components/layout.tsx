import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return <div className="grid bg-yellow-400 w-full h-full">{children}</div>;
}
