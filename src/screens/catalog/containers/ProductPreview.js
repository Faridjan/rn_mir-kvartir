import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableNativeFeedback } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

const noImage = require('src/assets/imgCateDefault.png')
const toLocaleStringPrice = (data) => data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
class ProductPreview extends Component {
	render() {
		const { item, navigation } = this.props
		const { name, images, price, type, id, purchasable, stock_status, meta_data } = item

		let address = meta_data.find((val) => val.key === 'adress_room')
		let typeBasePrice = meta_data.find((val) => val.key === 'type_base_price')
		let addPrice = meta_data.find((val) => val.key === 'add_price')
		let typeAddPrice = meta_data.find((val) => val.key === 'type_add_price')

		return (
			<TouchableNativeFeedback
				onPress={() => navigation.navigate('Object', { headerTitle: item.title })}
			>
				<View style={styles.preview}>
					<Image
						resizeMode='cover'
						style={styles.img}
						source={images && images[0] ? { uri: images[0].src, cache: 'cached' } : noImage}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.name}>{item.name}</Text>

						{address.value ? (
							<Text style={styles.address}>
								{address.value.street_name_short} {address.value.street_number}
							</Text>
						) : null}

						<Text style={styles.priceContainer}>
							<Text style={styles.price}>{toLocaleStringPrice(price)} </Text>
							<Text>{price && typeBasePrice ? typeBasePrice.value : null}</Text>
						</Text>
					</View>
				</View>
			</TouchableNativeFeedback>
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
		fontWeight: 'bold',
	},
	address: { fontSize: 16 },
	priceContainer: {
		fontSize: 16,
	},
	price: {
		fontWeight: 'bold',
		paddingRight: 5,
	},
})

export default withNavigation(ProductPreview)
