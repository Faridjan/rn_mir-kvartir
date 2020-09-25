import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

const noImage = require('src/assets/imgCateDefault.png')
const toLocaleStringPrice = (data) => data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
class ProductPreview extends Component {
	render() {
		const { item, navigation } = this.props
		const { images, meta_data, regular_price, sale_price, name } = item

		let address = meta_data.find((val) => val.key === 'adress_room')

		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('FoodObject', { headerTitle: name, item })
				}}
			>
				<View style={styles.preview}>
					<Image
						resizeMode='cover'
						style={styles.img}
						source={images && images[0] ? { uri: images[0].src, cache: 'reload' } : noImage}
					/>
					<View style={styles.textContainer}>
						<View>
							<Text style={styles.name}>{name}</Text>

							{address.value ? (
								<Text style={styles.address}>
									{address.value.street_name_short} {address.value.street_number}
								</Text>
							) : null}
						</View>

						<View style={styles.viewPrice}>
							<Text>
								<Text style={[styles.price, sale_price && styles.priceOld]}>
									{toLocaleStringPrice(regular_price)}
								</Text>
								<Text style={[styles.priceType, sale_price && styles.priceOld]}> ₸</Text>
							</Text>
							{sale_price ? (
								<Text style={styles.salePrice}>
									<Text style={styles.price}>{toLocaleStringPrice(sale_price)}</Text>
									<Text style={styles.priceType}> ₸</Text>
								</Text>
							) : null}
						</View>
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
	viewPrice: {
		paddingRight: 10,
	},
	price: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	priceType: {
		fontSize: 16,
		fontWeight: 'bold',
	},
	priceOld: {
		textDecorationLine: 'line-through',
		fontSize: 16,
		fontWeight: 'normal',
	},
	img: {
		width: 120,
		height: 120,
		borderRadius: 5,
	},
	textContainer: {
		marginLeft: 15,
		flexGrow: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	name: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 6,
	},
	address: { fontSize: 16, marginBottom: 6 },
	priceContainer: {
		fontSize: 16,
	},
})

export default withNavigation(ProductPreview)
