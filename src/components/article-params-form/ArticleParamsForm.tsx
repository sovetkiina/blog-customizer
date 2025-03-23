import styles from './ArticleParamsForm.module.scss';

import clsx from 'clsx';
import { useState, useRef, FormEvent } from 'react';

// Кастомные хуки
import { useOutsideClicker } from './hooks/useOutsideClicker';
import { useBodyScrollLock } from './hooks/useBodyScrollLock';
import { useEscapeCloseSidebar } from './hooks/useEscapeCloseSidebar';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';

import { Text } from 'src/ui/text';
import {
	ArticleStateType,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from '../../constants/articleProps';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (articleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Закрытие сайдбара при клике вне его области
	useOutsideClicker({
		onOutsideClick: () => setIsOpen(false),
		ref: sidebarRef,
		isActive: isOpen,
	});

	// Закрытие сайдбара по нажатию на Escape.
	useEscapeCloseSidebar({ isOpen, setIsOpen });

	// Блокировка скролла при открытом сайдбаре
	useBodyScrollLock({ isLocked: isOpen });

	// Состояния для параметров статьи
	const [font, setFont] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const toggleSidebar = () => {
		setIsOpen((prevState) => !prevState);
	};

	// Обработчик клика для кнопки "применить"
	const handleFormStateApply = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setArticleState({
			fontFamilyOption: font,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	// Обработчик клика для кнопки "сбросить"
	const handleResetFormState = () => {
		setArticleState(defaultArticleState);

		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	return (
		<div ref={sidebarRef}>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form
					className={styles.form}
					onReset={handleResetFormState}
					onSubmit={handleFormStateApply}>
					<Text as={'h2'} weight={800} size={31} uppercase>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={font}
						options={fontFamilyOptions}
						onChange={setFont}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						selected={fontSize}
						options={fontSizeOptions}
						onChange={setFontSize}
					/>
					<Select
						title='цвет шрифта'
						selected={fontColor}
						options={fontColors}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title='цвет фона'
						selected={backgroundColor}
						options={backgroundColors}
						onChange={setBackgroundColor}
					/>
					<Select
						title='ширина контента'
						selected={contentWidth}
						options={contentWidthArr}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
