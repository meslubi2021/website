import MarkdownIt from 'markdown-it';

const md = new MarkdownIt('commonmark');
export function parse(content: string): string {
	const tokens = md.parse(content, null);

	return md.renderer.render(
		transform_tokens(tokens),
		{
			highlight: null
		},
		null
	);
}

function transform_tokens(tokens: ReturnType<typeof md.parse>): ReturnType<typeof md.parse> {
	return tokens.map((token) => {
		if (token.children) {
			token.children = transform_tokens(token.children);
		}
		switch (token.type) {
			case 'paragraph_open':
				token.attrPush(['class', 'aw-paragraph']);
				break;
			case 'link_open':
				if (token.attrGet('href')?.startsWith('http')) {
					token.attrPush(['target', '_blank']);
				}
				// disable links for now
				token.attrSet('href', '#');
				token.attrPush(['class', 'aw-link']);
				break;
		}
		return token;
	});
}
