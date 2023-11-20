'use client';
import { Box, usePrevious } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const previousPathname = usePrevious(pathname);

	useEffect(() => {
		const handleRouteChange = () => {
			window.scrollTo(0, 0);
		};
		
		if (previousPathname !== pathname) {
			handleRouteChange();
		}
	}, [pathname, previousPathname]);
	return (
		<Box as="main">
			{children}
		</Box>
	);
}
