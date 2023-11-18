'use client';
import NavBar from '@/components/General/NavBar';
import { Box, usePrevious } from '@chakra-ui/react';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProLayout({ children }: { children: React.ReactNode }) {
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
		<Box as="section" maxWidth="lg" minWidth="250px" mx="auto">
			<NavBar />
			<Box
				as="section"
				border="1px solid"
				borderColor="gray.300"
				overflowY="auto"
				px="6"
				pt="10"
				pb="4"
				mt="14"
				minH="100vh"
			>
				{children}
			</Box>
		</Box>
	);
}
