import { useToast } from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
function useLocalStorage<T>(key: string, initialValue: T) {
	const toast = useToast();
	// Get from local storage and handle possible errors
	const getStoredValue = (): T => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error);
			return initialValue;
		}
	};
	const [value, setValue] = useState<T>(getStoredValue);
	const updateStoredValue = useCallback(
		(newValue: T) => {
			try {
				const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
				setValue(valueToStore);
				localStorage.setItem(key, JSON.stringify(valueToStore));
			} catch (error) {
				toast({ title: 'Local storage not found', status: 'error' });
				console.warn(`Error setting localStorage key “${key}”:`, error);
			}
		},
		[key, toast, value],
	);
	// Use Effect hook to update localStorage when value changes
	useEffect(() => {
		updateStoredValue(value);
	}, [key, value, updateStoredValue]);

	return { value, updateStoredValue } as const;
}

export default useLocalStorage;
