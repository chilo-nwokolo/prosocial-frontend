import { Providers } from '@/components/Providers';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'ProSocial App',
	description: 'Connect with your friends',
	manifest: '/manifest.json',
	icons: { apple: '/icon-152x152' },
	themeColor: "#000",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					{children}
				</Providers>
			</body>
		</html>
	);
}
