import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import { withNavigation } from '@react-navigation/compat'

const noImage = require('src/assets/imgCateDefault.png')
const toLocaleStringPrice = (data) => data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
class ProductPreview extends Component {
	render() {
		const { item, navigation } = this.props
		const { images, variations, meta_data } = item

		let address = meta_data.find((val) => val.key === 'adress_room')

		console.log(address)

		return (
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Object', { headerTitle: item.name, item })
				}}
			>
				<View style={styles.preview}>
					<Image
						resizeMode='cover'
						style={styles.img}
						source={images && images[0] ? { uri: images[0].src, cache: 'reload' } : noImage}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.name}>{item.name}</Text>

						{address.value ? (
							<Text style={styles.address}>
								{address.value.name ||
									address.value.street_name + ' ' + address.value.street_number}
							</Text>
						) : null}

						{variations ? (
							<View style={styles.viewPrice}>
								{Object.entries(variations).map(([key, variation]) => {
									return (
										<Text style={styles.priceGroup} key={key.toString()}>
											<Text style={styles.price}>
												{toLocaleStringPrice(variation.regular_price)}
											</Text>
											<Text style={styles.priceType}> {variation.name}</Text>
										</Text>
									)
								})}
							</View>
						) : null}
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexWrap: 'wrap',
		paddingRight: 10,
	},
	price: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	img: {
		width: 85,
		height: 85,
		borderRadius: 85 / 2,
	},
	textContainer: {
		marginLeft: 15,
		flexGrow: 1,
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
