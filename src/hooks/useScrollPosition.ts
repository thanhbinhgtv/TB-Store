import { useLayoutEffect, useState } from 'react';

const useScrollPosition = () => {
	const [scrollPosition, setScrollPosition] = useState(window.scrollY);

	useLayoutEffect(() => {
		const updatePosition = () => {
			setScrollPosition(window.scrollY);
		};

		window.addEventListener('scroll', updatePosition);

		return () => window.removeEventListener('scroll', updatePosition);
	}, []);

	return scrollPosition;
};

export default useScrollPosition;
