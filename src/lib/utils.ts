import type { Attachment } from 'svelte/attachments';

export const typesetMathJaxAttachment: Attachment = (element) => {
	// only typeset the element this attachment is attached to
	window.MathJax.typeset([element]);
}

export const latexTildeUnderLetterCommand = (letter: string) => `\\underset{\\sim}{${letter}}`;

export const latexRightArrowAboveLettersCommand =
	(letter1: string, letter2: string) => `\\overrightarrow{${letter1}${letter2}}`;
