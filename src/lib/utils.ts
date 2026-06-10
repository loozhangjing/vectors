import type { Attachment } from 'svelte/attachments';

export const typesetMathJaxAttachment: Attachment = (element) => {
	// only typeset the element this attachment is attached to
	window.MathJax.typeset([element]);
}
