import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class CategoryItem extends Component {
	render() {
		const { navigation, imageCategorySource, nameCategory } = this.props
		return (
			<TouchableOpacity
				onPress={navigation.navigate('ProductListScreen')}
				activeOpacity={1}
				key={id}
				style={styles.category}
			>
				<Thumbnail resizeMode='contain' square source={imageCategorySource} />
				<Text>{nameCategory}</Text>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	category: {
		width: '50%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 160,
		borderWidth: 1,
		borderRightWidth: index === 0 ? 0 : 1,
		borderBottomWidth: index === 0 ? 0 : 1,
		borderColor: '#ccc',
		marginLeft: index == 1 ? -1 : 0,
		marginTop: index == 2 ? -1 : 0,
	},
})
