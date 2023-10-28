import { apolloErrorHandler } from '@/utils/helpers';
import { Center, Spinner, useToast } from '@chakra-ui/react';
import { ReactNode } from 'react';

type Props = {
	loading: boolean;
	children: ReactNode;
	error: any;
};

export default function QueryContainer({ loading, children, error }: Props) {
	const toast = useToast();

	if (loading) {
		return (
			<Center h="100vh">
				<Spinner size="xl" />
			</Center>
		);
	}

	if (error) {
		toast({
			status: 'error',
			description: 'Invalid token',
			title: apolloErrorHandler(error),
		});
	}
	return <>{children}</>;
}
