import { useEffect } from 'react';

export function useOutsideClicker({
	onOutsideClick,
	ref,
	isActive,
}: {
	onOutsideClick: () => void;
	ref: React.RefObject<HTMLElement>;
	isActive: boolean;
}) {
	useEffect(() => {
		if (!isActive) return;

		function handleClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		}

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [isActive, onOutsideClick, ref]);
}
