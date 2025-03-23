import { useEffect } from 'react';

type UseEscapeCloseSidebarProps = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
};

export function useEscapeCloseSidebar({
	isOpen,
	setIsOpen,
}: UseEscapeCloseSidebarProps) {
	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				setIsOpen(false);
			}
		};

		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [isOpen, setIsOpen]);
}
