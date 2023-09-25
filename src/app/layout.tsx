import { Providers } from '@/Components/Providers';
import '@/styles/globals.css';
import { Box } from '@chakra-ui/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'ProSocial App',
	description: 'Connect with your friends',
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
