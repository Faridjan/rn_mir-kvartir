import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

class ProductPreview extends Component {
	render() {
		const { item, navigation } = this.props
		return (
			<TouchableOpacity onPress={() => navigation.navigate('Object', { headerTitle: item.title })}>
				<View style={styles.preview}>
					<Image resizeMode='cover' style={styles.img} source={require('src/assets/mask.png')} />
					<View style={styles.textContainer}>
						<Text style={styles.name}>{item.title}</Text>
						<Text style={styles.priceContainer}>
							<Text style={styles.price}>{item.price} </Text>
							<Text>Тенге/сутки</Text>
						</Text>
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
		paddingVertical: 10,
		flexDirection: 'row',
		alignItems: 'center',
	},
	img: {
		width: 85,
		height: 85,
		borderRadius: 85 / 2,
	},
	textContainer: {
		marginLeft: 15,
	},
	name: {
		fontSize: 16,
		marginBottom: 5,
		fontWeight: 'bold',
	},
	priceContainer: {
		fontSize: 16,
	},
	price: {
		fontWeight: 'bold',
		paddingRight: 5,
	},
})

export default withNavigation(ProductPreview)
