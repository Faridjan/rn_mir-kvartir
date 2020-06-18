import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

const Rating = ({
	startingValue,
	count,
	color,
	size,
	readonly,
	pad,
	onStartRating,
	containerStyle,
}) => {
	let listsIcon = []

	for (let i = 1; i <= count; i++) {
		listsIcon.push(
			<FontAwesome
				key={i}
				name={
					count <= startingValue || i <= startingValue
						? 'star'
						: i > startingValue && i - 1 < startingValue
						? 'star-half-empty'
						: 'star-o'
				}
				color={color ? color : '#ffcc00'}
				size={size}
				style={styles.textStart}
				onPress={readonly ? null : () => onStartRating(i)}
				containerStyle={
					i < count && {
						paddingRight: 4,
					}
				}
			/>,
		)
	}
	return (
		<View style={[styles.container, containerStyle && containerStyle]}>
			{listsIcon.map((icon) => icon)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textStart: {
		marginRight: 4,
	},
	textEnd: {
		marginLeft: 7,
	},
})

Rating.defaultProps = {
	startingValue: 1,
	count: 5,
	size: 12,
	pad: 4,
	readonly: false,
	onStartRating: () => {},
}

export default Rating
