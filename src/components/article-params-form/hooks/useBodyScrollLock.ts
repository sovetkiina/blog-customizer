import { useEffect } from 'react';

type UseBodyScrollLockProps = {
	isLocked: boolean;
};

export function useBodyScrollLock({ isLocked }: UseBodyScrollLockProps) {
	useEffect(() => {
		if (isLocked) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isLocked]);
}
