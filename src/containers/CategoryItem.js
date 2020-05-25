import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

const CategoryItem = ({ navigation, image, name }) => {
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('ProductList')}
			activeOpacity={1}
			// key={id}
			style={styles.category}
		>
			<Image resizeMode='contain' style={{ width: '100%' }} source={image} />
			<Text>{name}</Text>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	category: {
		width: '50%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		height: 160,
		borderWidth: 1,
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: '#ccc',
		marginLeft: 0,
		marginTop: 0,
	},
})

export default withNavigation(CategoryItem)
