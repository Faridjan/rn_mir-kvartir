import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

const checkIndexIsEven = (n) => {
	return n % 2 == 0
}

const CategoryItem = ({ navigation, image, name, index }) => {
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate('ProductList', { headerTitle: name })}
			activeOpacity={1}
			style={styles(index).category}
		>
			<Image resizeMode='contain' style={{ width: '100%', height: 60 }} source={image} />
			<Text>{name}</Text>
		</TouchableOpacity>
	)
}

const styles = (index) =>
	StyleSheet.create({
		category: {
			width: '50%',
			flexDirection: 'column',
			justifyContent: 'center',
			alignItems: 'center',
			height: 160,
			borderTopWidth: index === 0 || index === 1 ? 1 : 0,
			borderBottomWidth: 1,
			borderLeftWidth: checkIndexIsEven(index) ? 1 : 0,
			borderRightWidth: 1,
			borderColor: '#ccc',
			marginLeft: 0,
			marginTop: 0,
		},
	})

export default withNavigation(CategoryItem)
