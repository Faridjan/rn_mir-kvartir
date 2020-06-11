import React from 'react'
import HTMLView from 'react-native-htmlview'

import merge from 'lodash/merge'

import { SIZES, LH } from 'src/theme'

const TextHtml = ({ value, theme, style, ...rest }) => {
	const valueHtml = `<div>${
		value && typeof value === 'string' ? value.replace(/[\n\r]+/g, '') : ''
	}</div>`

	return <HTMLView {...rest} value={valueHtml} stylesheet={merge(styles(theme), style)} />
}

const styles = (theme) => ({
	div: {
		fontSize: SIZES.base,
		lineHeight: LH.base,
		textAlign: 'left',
	},
	span: {
		fontSize: SIZES.base,
		lineHeight: LH.base,
		textAlign: 'left',
	},
	p: {
		fontSize: SIZES.base,
		lineHeight: LH.base,
		textAlign: 'left',
	},
	a: {
		fontSize: SIZES.base,
		lineHeight: LH.base,
		color: '#96588a',
		textAlign: 'left',
	},
	b: {
		fontWeight: 'bold',
	},
	strong: {
		fontWeight: 'bold',
	},
})

TextHtml.defaultProps = {
	style: {},
}

export default TextHtml
