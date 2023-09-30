'use client';

import { Center, Image } from '@chakra-ui/react';
import { ImageLinks, appRouteLinks } from '@/utils/constants';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push(appRouteLinks.gettingStarted);
    }, 5000); 

    return () => {
      clearTimeout(timeout)
    }
  }, [router]);

	return (
		<Center h="100vh" p="10">
			<Image
				className="grow-element"
				src={ImageLinks.logoWithText}
				alt="prosocial logo"
				w={200}
				h={200}
				objectFit="contain"
			/>
		</Center>
	);
}
