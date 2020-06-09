import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

class ProductPreview extends Component {
	render() {
		const { item, navigation } = this.props
		return (
			<TouchableOpacity onPress={() => navigation.navigate('Object')}>
				<View style={styles.preview}>
					<Image resizeMode='contain' style={styles.img} source={require('src/assets/mask.png')} />
					<View style={styles.textContainer}>
						<Text style={styles.name}>{item.title}</Text>
						<Text style={styles.price}>{item.price} тенге</Text>
					</View>
				</View>
			</TouchableOpacity>
		)
	}
}

const styles = StyleSheet.create({
	preview: {
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderColor: '#444',
		// backgroundColor: 'green',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	img: {
		width: '30%',
	},
	textContainer: {
		marginLeft: 30,
	},
})

export default withNavigation(ProductPreview)
