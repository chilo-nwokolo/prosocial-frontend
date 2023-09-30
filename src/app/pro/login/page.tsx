'use client';

import {
	Box,
	Button,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { ImageLinks, appRouteLinks } from '@/utils/constants';
import Image from 'next/image';

export default function LoginPage() {
	return (
    <Center h="90vh">
      <Box my="auto">
        <Image src={ImageLinks.logo} width={75} height={75} alt='app logo' />
        <Text my="4" as="h1" fontSize="2xl" fontWeight="medium">
          Welcome to ProSocial
        </Text>
        <Text fontSize="lg" mb="10">
          Enter your details to start interacting with your friends
        </Text>
        <form>
          <Flex flexDir="column" gap="4">
            {/* Email */}
            <FormControl>
              <FormLabel>Email Address</FormLabel>
              <Input type="email" />
            </FormControl>
            {/* Password */}
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input type="password" />
            </FormControl>
            <Link href={appRouteLinks.intro}>
              <Button w="full">Login</Button>
            </Link>
          </Flex>
        </form>
      </Box>
    </Center>
	);
}
