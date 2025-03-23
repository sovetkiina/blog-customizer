import { useEffect } from 'react';

export function useOutsideClicker({
	onOutsideClick,
	ref,
}: {
	onOutsideClick: () => void;
	ref: React.RefObject<HTMLElement>;
}) {
	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		}

		document.addEventListener('mousedown', handleClick);

		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [onOutsideClick, ref]);
}
