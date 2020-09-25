import React from 'react'

import { StyleSheet, View } from 'react-native'

const Separator = function ({ style, small, large, big, ...rest }) {
	return (
		<View
			style={StyleSheet.flatten([
				styles.normal,
				small && styles.small,
				large && styles.large,
				big && styles.big,
				style && style,
			])}
			{...rest}
		/>
	)
}

const styles = {
	normal: {
		width: 12,
	},
	small: {
		width: 9,
	},
	large: {
		width: 16,
	},
	big: {
		width: 26,
	},
}
export default Separator
