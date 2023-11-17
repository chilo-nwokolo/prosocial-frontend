'use client';

import { Center, Image } from '@chakra-ui/react';
import { ImageLinks, appRouteLinks, configExtras } from '@/utils/constants';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useConfig } from '@/store';

export default function Home() {
  const router = useRouter();
	const [config] = useConfig((state) => [state.config]);

  useEffect(() => {
    const timeout = setTimeout(() => {
			if (config[configExtras.user_visited_intro_page]) {
				router.push(appRouteLinks.login);
				return;
			}
      router.push(appRouteLinks.welcome);
    }, 4000);

    return () => {
      clearTimeout(timeout)
    }
		
  }, [config, router]);

	return (
		<Center h="100vh" p="10">
			<Image
				className="grow-element"
				src={ImageLinks.logoWithText}
				alt="prosocial logo"
				w="200px"
				h="200px"
				objectFit="contain"
			/>
		</Center>
	);
}
