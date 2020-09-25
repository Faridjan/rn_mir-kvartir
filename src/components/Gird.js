import React from 'react'
import { View, StyleSheet } from 'react-native'

const Row = ({ children, style }) => (
	<View style={StyleSheet.flatten([styles.row, style])}>{children}</View>
)

const Col = ({ children, style }) => (
	<View style={StyleSheet.flatten([styles.col, style])}>{children}</View>
)

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		marginLeft: -6,
		marginRight: -6,
	},
	col: {
		flex: 1,
		paddingLeft: 6,
		paddingRight: 6,
	},
})

export { Row, Col }
