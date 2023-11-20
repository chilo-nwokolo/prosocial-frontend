'use client';

import { Center, Image } from '@chakra-ui/react';
import { ImageLinks, appRouteLinks, configExtras } from '@/utils/constants';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/libs/cookies';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
			if (getCookie(configExtras.user_visited_intro_page)) {
				router.push(appRouteLinks.login);
				return;
			}
      router.push(appRouteLinks.welcome);
    }, 1000);

    return () => {
      clearTimeout(timeout)
    }
		
  }, [router]);

	return (
		<Center h="100vh" p="10">
			<Image
				src={ImageLinks.logoWithText}
				alt="prosocial logo"
				w="200px"
				h="200px"
				objectFit="contain"
			/>
		</Center>
	);
}
